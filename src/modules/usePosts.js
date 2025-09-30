import {onMounted, ref} from 'vue'
//always import from the top

//initialize Firebase ----sth that was copied from firebase console(at one point)
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

import { collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";

import { db } from './firebase.js'

export function usePosts() {
    const postsFBcollectionRef = 'posts' //name of the collection in firebase

const posts = ref([]); //array to hold the posts from firebase
const newPostTitle = ref(''); //to hold the new post title

const showError = ref(false); //for showing/hiding the error message

//onMounted is a lifecycle hook that runs when the component is mounted; we are doing that before retrieving data from firebase to create html elements
onMounted(() => {
  //real-time listener to the collection
  onSnapshot(collection(db, postsFBcollectionRef), (snapshot) => {
    posts.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  });
});

//db and postsFBcollectionRef are passed as arguments to the collection function; the first argument is the database and the second is the name of the collection
//snapshot is just a iterator that goes through the documents in the collection
//map is like a forEach loop that goes through each document in the collection; doc is the current document in the loop(iterator)

//save your fct in a variable and call it in the template when you need it
const addPost = async () => {
    if (newPostTitle.value.trim() === '') {
        showError.value = true;
        return; //exit the function early if the input is empty or contains only spaces
    } 

  //prevent adding empty posts
  //if is for checking before adding a post if the input field is empty or contains only spaces; to not fire the addDoc fct in that case
  // the === operator checks for both value and type equality; trim() removes whitespace from both ends of a string
  //return is used to exit the function early if the condition is met
    try {
        await addDoc(collection(db, postsFBcollectionRef), {
        title: newPostTitle.value
        });

        //clear the input and hides the error message
        newPostTitle.value = ''; //clear the input field after adding the post
        showError.value = false; //hide the error message after successfully adding a post
    } catch (error) {
        console.error("Error adding document: ", error);
    }
    };

    const deletePost = async (id) => {
    try {
        console.log("Delete post with id: ", id);
        await deleteDoc(doc(db, postsFBcollectionRef, id));
    }
    catch (error) {
        console.log("Error deleting document: ", error);
        //we could also create a const with a message for the user
    }
    }

    return { posts, newPostTitle, addPost, deletePost, showError }

}

//could also be useCreatePost fct that returns addPost fct, useUPdatePost fct, useDeletePost fct, useGetPosts fct