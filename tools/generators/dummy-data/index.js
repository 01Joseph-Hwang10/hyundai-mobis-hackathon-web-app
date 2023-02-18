/**
 * @fileoverview
 * Generates dummy data for the database.
 * In this case, the database refers to the Firestore database.
 * Generated data is written at `tools/emulators/fixtures/default.json`.
 */

const { faker } = require('@faker-js/faker');
const firebase = require('firebase');
const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const { SPECIFIED_VEHICLE_SERIAL_CODE } = require('../../../dist/libs/constants');

// Utility functions & constants

const FIXED_VIDEO_ID = 'fixed-video-id';

const createEmptyArray = (length = Math.max(Math.floor(Math.random() * 20), 10)) => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(undefined);
  }
  return arr;
};

const createDocuments = (cb) => createEmptyArray().fill(0).map(cb);

const createEntity = (data) => ({
  id: faker.random.alphaNumeric(16),
  createdAt: faker.date.between('2019-01-01', '2022-02-17').getTime() / 1000,
  ...data,
});

const createVehicle = (serialCode) =>
  createEntity({
    serialCode: serialCode ?? faker.random.alphaNumeric(8),
    info: {
      carId: faker.random.alphaNumeric(8),
    },
    metrics: {
      batteryLevel: Math.random(),
      maximumRange: Number.parseInt(faker.random.numeric(3)),
      distanceDriven: Number.parseInt(faker.random.numeric(5)),
    },
  });

// Initialize Firebase
const app = firebase.default.initializeApp({
  projectId: 'fake-id-is-inserted-as-it-is-needed-for-the-emulator',
  storageBucket: 'fake-id-is-inserted-as-it-is-needed-for-the-emulator.appspot.com',
});
const db = app.firestore();
const storage = app.storage();
db.useEmulator('localhost', 8080);
storage.useEmulator('localhost', 9199);

// Create dummy data at firestore
const runner = async () => {
  // Clear all data in firestore and storage
  const snapshot = await db.collection('vehicle').get();
  await Promise.all(snapshot.docs.map((doc) => doc.ref.delete()));
  const files = await storage.ref().listAll();
  await Promise.all(files.items.map((file) => file.delete()));

  // Vehicle collection
  await Promise.all(
    createDocuments(() => createVehicle())
      .concat(createVehicle(SPECIFIED_VEHICLE_SERIAL_CODE))
      .map(async (vehicle) => {
        const ref = await db.collection('vehicle').add(vehicle);
        await Promise.all([
          // Snapshot subcollection
          ...createDocuments(() =>
            createEntity({
              content: faker.random.alphaNumeric(128),
            })
          ).map(async (snapshot) => {
            await ref.collection('snapshot').add(snapshot);
          }),

          // Video subcollection
          ...createDocuments(() =>
            createEntity({
              videoId: FIXED_VIDEO_ID,
            })
          ).map(async (video) => {
            await ref.collection('video').add(video);
          }),

          // Deformation subcollection
          ...createDocuments(() =>
            createEntity({
              content: Math.floor(Math.random() * 24),
            })
          ).map(async (deformation) => {
            await ref.collection('deformation').add(deformation);
          }),
        ]);
      })
  );

  // Upload dummy data at storage

  const uploadFile = (path, file) =>
    new Promise((resolve, reject) => {
      const ref = storage.ref().child(path);
      const task = ref.put(file);
      task.on('state_changed', () => {}, reject, resolve);
    });

  const filePath = path.resolve(__dirname, 'data', 'video.mp4');
  await uploadFile(`videos/${FIXED_VIDEO_ID}.mp4`, fs.readFileSync(filePath));

  console.log('Dummy data generated successfully');
  exit();
};

runner();
