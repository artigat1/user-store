import { initializeApp } from 'firebase/app'
import FirebaseFirestore, {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    orderBy,
    updateDoc,
    query
} from 'firebase/firestore'

import { User } from "@/models/user"

const firebaseConfig = {
    apiKey: "AIzaSyBn1axVKyNj9iIpC3czuos-CO3PJMhRO6s",
    authDomain: "user-store-67ce3.firebaseapp.com",
    projectId: "user-store-67ce3",
    storageBucket: "user-store-67ce3.appspot.com",
    messagingSenderId: "928217112617",
    appId: "1:928217112617:web:d0ce86e6059a27d3bc7c38"
}
const collectionName = 'users'

const userConverter = {
    toFirestore: (data: User) => data,
    fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => {
        const data = snap.data()
        return {
            id: snap.id,
            ...data,
        } as User
    }
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const usersCollection = collection(db, collectionName).withConverter(userConverter)

export const getUsers = async (): Promise<User[]> => {
    const q = query(usersCollection, orderBy('name'))
    const userSnapshot = await getDocs(q)
    return userSnapshot.docs.map(doc => doc.data())
}

export const getUser = async (id: string): Promise<User | null> => {
    const docRef = getDocRef(id).withConverter(userConverter)
    const userSnapshot = await getDoc(docRef)
    if (userSnapshot.exists()) {
        return userSnapshot.data()
    }
    return null
}

export const createUser = async (user: User): Promise<string> => {
    const response = await addDoc(usersCollection, user)
    return response.id
}

export const deleteUser = async (id: string): Promise<void> => {
    await deleteDoc(getDocRef(id))
}

export const updateUser = async(user: User): Promise<void> => {
    return await updateDoc(getDocRef(user.id as string), user)
}

const getDocRef = (id: string):  FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData> => {
    return doc(db, collectionName, id)
} 