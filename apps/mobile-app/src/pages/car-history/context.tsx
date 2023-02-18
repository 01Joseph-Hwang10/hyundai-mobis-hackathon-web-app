import { isDev } from '@hyundai-mobis-hackathon-web-app/constants';
import { Deformation, FilterOptions, Video } from '@hyundai-mobis-hackathon-web-app/firebase';
import { Maybe, wait } from '@hyundai-mobis-hackathon-web-app/utils';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GlobalContext } from '../../app/context';

export type HistoryTypeFilter = 'all' | 'deformation' | 'video';

type HistoryType =
  | {
      type: 'deformation';
      data: Deformation;
    }
  | {
      type: 'video';
      data: Video;
    };

interface CarHistoryContextType extends FilterOptions {
  setSort: (sort: FilterOptions['sort']) => void;
  setStartDate: (date: Maybe<number>) => void;
  setEndDate: (date: Maybe<number>) => void;

  filter: HistoryTypeFilter;
  setFilter: (filter: HistoryTypeFilter) => void;

  histories: HistoryType[];
  requestMoreHistories: () => Promise<void>;

  loading: boolean;
}

export const CarHistoryContext = createContext<CarHistoryContextType>({
  sort: 'desc',
  setSort: () => null,
  timerange: {},
  setStartDate: () => null,
  setEndDate: () => null,

  filter: 'all',
  setFilter: () => null,

  histories: [],
  requestMoreHistories: () => Promise.resolve(),

  loading: false,
});

const pagination = 10;

const deformationIsRequired = (queryString: string) => {
  return (
    queryString
      .slice(1)
      .split('&')
      .map((entry) => entry.split('='))
      .filter(([key, value]) => key === 't' && value === 'deformation').length > 0
  );
};

export const CarHistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const { vehicle } = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);

  const [sort, setSort] = useState<FilterOptions['sort']>('desc');
  const [timerange, setTimerange] = useState<FilterOptions['timerange']>({});
  const [filter, setFilter] = useState<HistoryTypeFilter>('all');

  const [deformations, setDeformations] = useState<HistoryType[]>([]);
  const [videos, setVideos] = useState<HistoryType[]>([]);

  useEffect(() => {
    if (deformationIsRequired(location.search)) {
      setFilter('deformation');
    }
  }, [location.search]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (isDev()) await wait(1000); // This is for demo purpose.
      if (filter === 'all' || filter === 'deformation') {
        const _deformations = await vehicle?.listDeformations({ sort, timerange, limit: pagination });
        setDeformations(_deformations?.map((deformation) => ({ type: 'deformation', data: deformation })) ?? []);
      }
      if (filter === 'all' || filter === 'video') {
        const _videos = await vehicle?.listVideos({ sort, timerange, limit: pagination });
        setVideos(_videos?.map((video) => ({ type: 'video', data: video })) ?? []);
      }
      setLoading(false);
    })();
  }, [sort, timerange, filter, vehicle, timerange?.start, timerange?.end]);

  const requestMoreHistories = async () => {
    setLoading(true);
    if (filter === 'all' || filter === 'deformation') {
      const _deformations = await vehicle?.listDeformations({ sort, timerange, skip: deformations.length, limit: pagination });
      setDeformations(_deformations?.map((deformation) => ({ type: 'deformation', data: deformation })) ?? []);
    }
    if (filter === 'all' || filter === 'video') {
      const _videos = await vehicle?.listVideos({ sort, timerange, skip: videos.length, limit: pagination });
      setVideos(_videos?.map((video) => ({ type: 'video', data: video })) ?? []);
    }
    setLoading(false);
  };

  let histories = [];
  if (filter === 'all') {
    histories = [...deformations, ...videos].sort((a, b) => b.data.createdAt - a.data.createdAt);
    if (sort === 'asc') histories = histories.reverse();
  } else {
    histories = filter === 'deformation' ? deformations : videos;
  }

  const providerValue: CarHistoryContextType = {
    sort,
    setSort,
    timerange,
    setStartDate: (date) => setTimerange({ start: date ?? undefined, end: timerange?.end }),
    setEndDate: (date) => setTimerange({ start: timerange?.start, end: date ?? undefined }),

    filter,
    setFilter,

    histories,
    requestMoreHistories,

    loading,
  };

  return <CarHistoryContext.Provider value={providerValue}>{children}</CarHistoryContext.Provider>;
};
