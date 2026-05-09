import React, { createContext, useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, collection, query, where, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useStore } from '../store/useStore';

const AuthContext = createContext<any>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setUser, setStats, setProjects, setLoading } = useStore();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });

        // Ensure user document exists
        const userDocRef = doc(db, 'users', user.uid);
        try {
          const userDoc = await getDoc(userDocRef);
          
          if (!userDoc.exists()) {
            await setDoc(userDocRef, {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              xp: 0,
              level: 1,
              streak: 0,
              completedBlueprints: 0,
              createdAt: new Date().toISOString()
            });
          }
        } catch (error) {
          console.error("User initialization failed:", error);
        }

        // Listen for user stats
        const unsubscribeStats = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            setStats({
              xp: data.xp,
              level: data.level,
              streak: data.streak,
              completedBlueprints: data.completedBlueprints,
            });
          }
        }, (error) => {
          import('../lib/firebase').then(({ handleFirestoreError, OperationType }) => {
            handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
          });
        });

        // Listen for user projects
        const q = query(collection(db, 'projects'), where('userId', '==', user.uid));
        const unsubscribeProjects = onSnapshot(q, (snapshot) => {
          const projectsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as any[];
          setProjects(projectsData);
        }, (error) => {
          import('../lib/firebase').then(({ handleFirestoreError, OperationType }) => {
            handleFirestoreError(error, OperationType.LIST, 'projects');
          });
        });

        setLoading(false);
        return () => {
          unsubscribeStats();
          unsubscribeProjects();
        };
      } else {
        setUser(null);
        setProjects([]);
        setStats({ xp: 0, level: 1, streak: 0, completedBlueprints: 0 });
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, [setUser, setStats, setProjects, setLoading]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
