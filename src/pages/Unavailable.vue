<script setup>
function hello(event) {
  alert("ok")
}
</script>

<template>
  <div class="background">
    <div class="color"></div>
    <div class="container">
        <p>This product is unavailable to show</p>
        <button @click="hello">Next Product</button>
        <svg  xmlns="http://www.w3.org/2000/svg" width="500" height="500" fill="currentColor" class="bi bi-emoji-frown" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
</svg>
    </div>
  </div>
</template>

<style>
.background{
  position: inherit;
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -9;
  height: 100vh;
}
.color{
  position: absolute;
  top: 0px;
  z-index: 0;
  width: 100%;
  height: 60%;
  background-color: #eaeaea;
}
.container{
  position: relative;
  background-color: white;
  z-index: 5;
width: 1034px;
height: 580px;
  display: flex;
  flex-direction: column;
  gap: 13px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
background: #FFF;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

}
.bi-emoji-frown{
  position: absolute;
  z-index: -1;
  color: #0000000e;
  
}
p{
  font-size: 20px;
font-weight: 400;
}
button{
  margin: 0;
  padding: 9px 169px;
  border-radius: 4px;
border: 3px solid #000;
background: #FFF;

color: #3F3F3F;

font-size: 20px;
font-weight: 600;
}
</style>