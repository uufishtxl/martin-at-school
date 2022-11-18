<template>
  <audio id="localAudio" loop src="fireworks.mp3"></audio>
</template>

<script setup lang="ts">
document.body.addEventListener('mousemove', () => {
  const audio: HTMLAudioElement | null = document.getElementById('localAudio')
  if (audio) void audio.play()
})
</script>
