import { styled, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { animate, GRAPHIC_VIEW_ID, OBJ_CNT_ID, POPUP_PARTS_DRATE_ID, POPUP_PARTS_NAME_ID, POPUP_PARTS_WINDOW_ID } from './render';

const Wrapper = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Indicator = styled('div')`
  margin: 0px;
  padding: 10px;
  position: fixed;
  font-size: 50px;
  color: black;
  font-family: Trebuchet;
  font-weight: bolder;
`;

const PartsPopup = styled('div')`
  position: absolute;
  height: auto;
  padding: 5px;
  background: white;
  border-width: 1px;
  border-color: black;
  border-style: solid;
  display: none;
`;

const VehicleRenderer = () => {
  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    if (rendered) return;
    animate();
    setRendered(true);
  }, [rendered]);
  return (
    <Wrapper>
      <Indicator id="indicator">
        <Typography variant="inherit">Part: </Typography>
        <Typography variant="inherit" id={OBJ_CNT_ID}>
          None
        </Typography>
      </Indicator>
      <canvas style={{ marginTop: 0 }} id={GRAPHIC_VIEW_ID}></canvas>
      <PartsPopup id={POPUP_PARTS_WINDOW_ID}>
        <div>
          <Typography>Name: </Typography>
          <Typography id={POPUP_PARTS_NAME_ID}>None</Typography>
        </div>
        <div>
          <Typography>Deformation: </Typography>
          <Typography id={POPUP_PARTS_DRATE_ID}>0%</Typography>
        </div>
      </PartsPopup>
    </Wrapper>
  );
};

export default VehicleRenderer;
