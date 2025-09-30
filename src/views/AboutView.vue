<template>
  <div class="about">
    <p ref="textElement">This is animated text</p>
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
import { ref, onMounted } from 'vue'
import { usePosts } from '../modules/usePosts.js'
import { animate, stagger, splitText } from 'animejs'

const { posts, newPostTitle, addPost, deletePost, showError } = usePosts()
const textElement = ref(null)

onMounted(() => {
  if (textElement.value) {
    const { chars } = splitText(textElement.value, {
      chars: { wrap: true },
    })

    animate(chars, {
      y: ['75%', '0%'],
      duration: 750,
      ease: 'out(3)',
      delay: stagger(50),
      loop: true,
      alternate: true,
    })
  }
})
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