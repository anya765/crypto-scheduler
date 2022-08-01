<template>
  <a class="mt-4" href="#">
    <span>{{ label }}</span>
    <div class="liquid" />
  </a>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
  },
}
</script>
<style scoped>
a {
  position: relative;
  padding: 10px 25px;
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  width: 200px;
  overflow: hidden;
  border-radius: 40px;
}

a span {
  position: relative;
  color: #fff;
  font-size: 20px;
  letter-spacing: 8px;
  z-index: 1;
}

a .liquid {
  position: absolute;
  top: -80px;
  left: 0;
  width: 200px;
  height: 180px;
  background: #4973ff;
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
  transition: 0.5s;
}

a .liquid::after,
a .liquid::before {
  content: '';
  width: 200%;
  height: 200%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -75%);
  background: #000;
}

a .liquid::before {
  border-radius: 45%;
  background: rgba(20, 20, 20, 1);
  animation: animate 5s linear infinite;
}

a .liquid::after {
  border-radius: 40%;
  background: rgba(20, 20, 20, 0.5);
  animation: animate 10s linear infinite;
}

a:hover .liquid {
  top: -120px;
}

@keyframes animate {
  0% {
    transform: translate(-50%, -75%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -75%) rotate(360deg);
  }
}
</style>
