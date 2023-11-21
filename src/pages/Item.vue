<script>
import axios from "axios";
import { ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        let counter = ref(1);
        const items = ref([]);
        const imageURL = ref("");
        const isLoading = ref(false);
        const router = useRouter();

        const fetchProductData = async () => {
            try {
                isLoading.value = true;
                const response = await axios.get("https://fakestoreapi.com/products/" + counter.value);
                items.value = response.data;
                imageURL.value = response.data.image;
                updateBackgroundColor(); // Update background color based on counter value
                if (counter.value > 20) {
                    router.push('/unavailable')
                }
                console.log(counter.value);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                isLoading.value = false;
            }
        };



        const updateBackgroundColor = () => {
            // Change background color based on counter value
            if (counter.value >= 1 && counter.value <= 10) {
                document.querySelector('.color').style.backgroundColor = '#d6e6ff';
            } else if (counter.value >= 11 && counter.value <= 20) {
                document.querySelector('.color').style.backgroundColor = '#fde2ff';
            }
        };

        // Fetch data initially
        fetchProductData();

        // Watch for changes in counter and fetch data accordingly
        watch(counter, () => {
            fetchProductData();
        });

        return { counter, items, imageURL, isLoading, router };
    },
};
</script>


<template>
    <div class="background">
        <div class="color"></div>
        <div v-if="!isLoading" class="container">
            <div class="left">
                <img :src="imageURL" width="301" height="383" alt="" />
            </div>
            <div class="right">
                <div class="rightTop">
                    <h1 class="heading blue">{{ items.title }}</h1>

                    <div class="identifier">
                        <p class="light">{{ items.category }}</p>
                        <div class="rating">

                            <p>{{ items.rating.rate }}</p>
                            <div class="circles">
                                <!-- Use v-for to loop through a range of numbers based on the rating -->
                                <div v-for="i in Math.round(items.rating.rate)" :key="i" class="circleFull"></div>
                                <div v-for="i in Math.round(5 - items.rating.rate)" :key="i" class="circleBorder"></div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <p class="normal">
                        {{ items.description }}
                    </p>
                </div>
                <div class="rightBottom">
                    <hr />
                    <h1 class="blue heading">${{ items.price }}</h1>
                    <div class="buttons">
                        <button @click="counter++" class="buttonLeft">Buy Now</button>
                        <button @click="counter++" class="buttonRight">Next Product</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isLoading" class="loadingContainer">
            <div class="loader"></div>
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
    background: #fde2ff;
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

.loadingContainer {
    position: relative;
    background-color: white;
    z-index: 5;
    width: 1034px;
    height: 580px;
    padding: 50px;
    display: flex;
    flex-direction: row;
    gap: 13px;
    justify-content: center;
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

hr {
    stroke-width: 1px;
    stroke: rgba(0, 0, 0, 0.2);
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
    overflow: auto
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
    cursor: pointer;
}

.rating {
    display: flex;
    gap: 5px;
    align-items: center;
}

.circles {
    display: flex;
    gap: 2px;
}

.circleFull {
    width: 18px;
    height: 18px;
    background-color: #002772;
    border-radius: 50%;
}

.circleBorder {
    width: 18px;
    height: 18px;
    border: 1px solid #002772;
    border-radius: 50%;
}

.loader {
    border: 16px solid #f3f3f3;
    /* Light grey */
    border-top: 16px solid #3498db;
    /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>