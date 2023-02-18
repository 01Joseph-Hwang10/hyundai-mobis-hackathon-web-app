import firebase from 'firebase';

export type CollectionReference<T> = firebase.firestore.CollectionReference<T>;
export type Query<T = unknown> = firebase.firestore.Query<T>;
export type DocumentReference<T = unknown> = firebase.firestore.DocumentReference<T>;
export type Firestore = firebase.firestore.Firestore;
export type FirebaseStorage = firebase.storage.Storage;
export type FirebaseApp = firebase.app.App;
export type DocumentData = firebase.firestore.DocumentData;
export type QuerySnapshot<T> = firebase.firestore.QuerySnapshot<T>;
