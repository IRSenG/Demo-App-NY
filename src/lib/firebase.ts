import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  onSnapshot,
  doc,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { OperationalExceptionRecord } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  timestamp: string;
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path,
    timestamp: new Date().toISOString()
  };
  console.error('Firestore Operation Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore with custom databaseId from configuration
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Test Firestore connection on boot as recommended in the skill
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'operational_exceptions', 'test-connection-probe'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore client is offline or initializing.');
    }
    return false;
  }
}

// Save an approved decision to Firestore
export async function saveOperationalException(record: Omit<OperationalExceptionRecord, 'id'>): Promise<string> {
  const collectionPath = 'operational_exceptions';
  try {
    const docRef = await addDoc(collection(db, collectionPath), {
      ...record,
      dispatchedAt: record.dispatchedAt || new Date().toISOString(),
      status: record.status || 'Ejecutado'
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, collectionPath);
  }
}

// Listen to recent decisions in real time
export function subscribeToRecentExceptions(
  onData: (records: OperationalExceptionRecord[]) => void,
  onError?: (err: Error) => void
) {
  const collectionPath = 'operational_exceptions';
  const q = query(collection(db, collectionPath), orderBy('dispatchedAt', 'desc'), limit(15));

  return onSnapshot(
    q,
    (snapshot) => {
      const records: OperationalExceptionRecord[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<OperationalExceptionRecord, 'id'>)
      }));
      onData(records);
    },
    (error) => {
      console.error('Snapshot error on operational_exceptions:', error);
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.LIST, collectionPath);
    }
  );
}
