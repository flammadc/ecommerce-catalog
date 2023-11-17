<script setup>
import { ref, computed } from "vue";
</script>

<template>
  <div class="background">
    <div class="color"></div>
    <div class="container">
      <div class="left">
        <img src="./assets/img/image 2.png" width="301" height="383" alt="" />
      </div>
      <div class="right">
        <div class="rightTop">
          <h1 class="heading blue">Mens Casual Slim Fit</h1>
          <div class="identifier">
            <p class="light">man's clothing</p>
            <p>rating</p>
          </div>
          <hr />
          <p class="normal">
            great outerwear jackets for Spring/Autumn/Winter, suitable for many
            occasions, such as working, hiking, camping, mountain/rock climbing,
            cycling, traveling or other outdoors. Good gift choice for you or
            your family member. A warm hearted love to Father, husband or son in
            this thanksgiving or Christmas Day.
          </p>
        </div>
        <div class="rightBottom">
          <hr />
          <h1 class="blue heading">$29.5</h1>
          <div class="buttons">
            <button class="buttonLeft">Buy Now</button>
            <button class="buttonRight">Next Product</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.background {
  position: inherit;
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -9;
  height: 100vh;
}
.color {
  position: absolute;
  top: 0px;
  z-index: 0;
  width: 100%;
  height: 60%;
  background: #d6e6ff;
}
.container {
  position: relative;
  background-color: white;
  z-index: 5;
  width: 1034px;
  height: 580px;
  padding: 50px;
  display: flex;
  flex-direction: row;
  gap: 13px;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
.left {
  width: 300px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.right {
  width: 600px;
  height: 500px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}
.rightTop {
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.identifier {
  display: flex;
  justify-content: space-between;
}
.rightBottom {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.buttons {
  display: flex;
  justify-content: space-between;
}
.heading {
  font-size: 28px;
  font-weight: 600;
}
.light {
  color: #3f3f3f;
  font-size: 18px;
  font-weight: 400;
}
.normal {
  font-size: 20px;
  font-weight: 400;
  color: #1e1e1e;
}
.blue {
  color: #002772;
}
.buttonLeft {
  margin: 0;
  padding: 9px 88px;
  border-radius: 4px;
  background: #002772;
  color: #fff;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border: 3px solid #002772;
}
.buttonRight {
  margin: 0;
  padding: 9px 88px;
  color: #002772;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-radius: 4px;
  border: 3px solid #002772;
  background: #fff;
}
</style>