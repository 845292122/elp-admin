<script setup>
import CornerTop from './corner-top.vue'
import CornerBottom from './corner-bottom.vue'
</script>

<template>
  <div class="login-bg">
    <div class="corner-top-box">
      <CornerTop></CornerTop>
    </div>
    <div class="corner-bottom-box">
      <CornerBottom></CornerBottom>
    </div>

    <div class="fly bg-fly-circle1"></div>
    <div class="fly bg-fly-circle2"></div>
    <div class="fly bg-fly-circle3"></div>
    <div class="fly bg-fly-circle4"></div>
  </div>
</template>

<style lang="scss" scoped>
.login-bg {
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  z-index: 1;
  .corner-top-box {
    position: absolute;
    top: -1000px;
    right: -700px;
  }
  .corner-bottom-box {
    position: absolute;
    bottom: -600px;
    left: -300px;
  }
}

.fly {
  pointer-events: none;
  position: fixed;
  z-index: 9999;
}
.bg-fly-circle1 {
  left: 40px;
  top: 100px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(to right, rgba(var(--primary-6), 0.07) 0%, rgba(var(--primary-6), 0.04) 100%);
  animation: move 2.5s linear infinite;
}

.bg-fly-circle2 {
  left: 15%;
  bottom: 5%;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(to right, rgba(var(--primary-6), 0.08) 0%, rgba(var(--primary-6), 0.04) 100%);
  animation: move 3s linear infinite;
}

.bg-fly-circle3 {
  right: 20%;
  top: 140px;
  width: 145px;
  height: 145px;
  border-radius: 50%;
  background: linear-gradient(to right, rgba(var(--primary-6), 0.1) 0%, rgba(var(--primary-6), 0.04) 100%);
  animation: move 2.5s linear infinite;
}

.bg-fly-circle4 {
  right: 5%;
  top: 60%;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: linear-gradient(to right, rgba(var(--primary-6), 0.02) 0%, rgba(var(--primary-6), 0.04) 100%);
  animation: move 3.5s linear infinite;
}

@keyframes move {
  0% {
    transform: translateY(0px) scale(1);
  }

  50% {
    transform: translateY(25px) scale(1.1);
  }

  100% {
    transform: translateY(0px) scale(1);
  }
}
</style>
