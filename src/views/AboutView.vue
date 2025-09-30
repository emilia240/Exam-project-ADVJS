<template>
  <div class="about">
    <h1>This is a post page</h1>

    <input type="text" v-model="newPostTitle" placeholder="Post Title" />
    <button @click="addPost">Add post</button>
    <span v-if="showError">Have to enter a post title</span>

    <ul>
      <li v-for="post in posts" :key="post.id">
        {{ post.title }}
        {{ post.id }}
        <button @click="deletePost(post.id)">Delete</button>
      </li>
    </ul>

  </div>
</template>


<script setup>
import { usePosts} from '../modules/usePosts.js'

const { posts, newPostTitle, addPost, deletePost, showError } = usePosts();



</script>

<style>
@media (min-width: 1024px) {
/*   .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  } */
}
</style>
