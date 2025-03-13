import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

// Replace the placeholder strings with your actual Firebase configuration values
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Editor() {
    const [text, setText] = useState("");

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "documents", "shared"), (doc) => {
            setText(doc.data().content);
        });

        return () => unsub();
    }, []);

    const updateText = async (e) => {
        setText(e.target.value);
        await setDoc(doc(db, "documents", "shared"), { content: e.target.value });
    };

    return <textarea value={text} onChange={updateText} />;
}

export default Editor;