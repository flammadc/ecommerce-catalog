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
        const men = ref(false);
        const women = ref(false);
        const clothing = ref(true);
        const router = useRouter();


        const fetchProductData = async () => {
            try {
                isLoading.value = true;
                const response = await axios.get("https://fakestoreapi.com/products/" + counter.value);
                items.value = response.data;
                imageURL.value = response.data.image;
                if (items.value.category == "men's clothing" || items.value.category == "women's clothing") {
                    clothing.value = true;

                    if (items.value.category == "men's clothing") {
                        men.value = true;
                        women.value = false
                    }
                    if (items.value.category == "women's clothing") {
                        women.value = true;
                        men.value = false
                    }
                    updateBackgroundColor(); // Update background color based on counter value

                }
                if (items.value.category != "men's clothing" && items.value.category != "women's clothing") {
                    if (counter.value > 20) {
                        router.push('/unavailable')
                    }
                    clothing.value = false;
                }

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
                document.querySelector(".color").style.background = '#fde2ff';
            }
        };

        // Fetch data initially
        fetchProductData();

        // Watch for changes in counter and fetch data accordingly 
        watch(counter, () => {
            fetchProductData();
        });

        return { counter, items, imageURL, isLoading, router, clothing, men, women };
    },
};
</script>


<template>
    <div v-if="clothing" class="background">
        <div class="color"></div>
        <div v-if="!isLoading" class="container">
            <div class="left">
                <img :src="imageURL" width="301" height="383" alt="" />
            </div>

            <div v-if="men" class="right">
                <div class="rightTop">
                    <h1 class="heading blue">{{ items.title }}</h1>

                    <div class="identifier">
                        <p class="light">{{ items.category }}</p>
                        <div class="rating">

                            <p>{{ items.rating.rate }}</p>
                            <div class="circles">
                                <!-- Use v-for to loop through a range of numbers based on the rating -->
                                <div v-for="i in Math.round(items.rating.rate)" :key="i" class="circleFullMen"></div>
                                <div v-for="i in (5 - Math.round(items.rating.rate))" :key="i" class="circleBorderMen">
                                </div>
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

                        <button @click="counter++" class="buttonLeftMen">Buy Now</button>
                        <button @click="counter++" class="buttonRightMen">Next Product</button>
                    </div>
                </div>
            </div>

            <div v-if="women" class="right">
                <div class="rightTop">
                    <h1 class="heading purple">{{ items.title }}</h1>

                    <div class="identifier">
                        <p class="light">{{ items.category }}</p>
                        <div class="rating">

                            <p>{{ items.rating.rate }}</p>
                            <div class="circles">
                                <!-- Use v-for to loop through a range of numbers based on the rating -->
                                <div v-for="i in Math.round(items.rating.rate)" :key="i" class="circleFullWomen"></div>
                                <div v-for="i in (5 - Math.round(items.rating.rate))" :key="i" class="circleBorderWomen">
                                </div>
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
                    <h1 class="purple heading">${{ items.price }}</h1>
                    <div class="buttons">

                        <button @click="counter++" class="buttonLeftWomen">Buy Now</button>
                        <button @click="counter++" class="buttonRightWomen">Next Product</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isLoading" class="loadingContainer">
            <div class="loader"></div>
        </div>
    </div>

    <div v-else class="background">
        <div class="colorUnavailable"></div>
        <div class="containerUnavailable">
            <p class="textUnavailable">This product is unavailable to show</p>
            <button class="buttonUnavailable" @click="counter++">Next Product</button>
            <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" fill="currentColor" class="bi bi-emoji-frown"
                viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path
                    d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
            </svg>
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


.colorUnavailable {
    position: absolute;
    top: 0px;
    z-index: 0;
    width: 100%;
    height: 60%;
    background-color: #eaeaea;
}

.containerUnavailable {
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
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.bi-emoji-frown {
    position: absolute;
    z-index: -1;
    color: #0000000e;

}

.textUnavailable {
    font-size: 20px;
    font-weight: 400;
}

.buttonUnavailable {
    margin: 0;
    padding: 9px 169px;
    border-radius: 4px;
    border: 3px solid #000;
    background: #FFF;
    cursor: pointer;
    color: #3F3F3F;

    font-size: 20px;
    font-weight: 600;
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

.purple {
    color: #720060;
}

.buttonLeftMen {
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
    border: none;
}

.buttonRightMen {
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

.buttonLeftWomen {
    margin: 0;
    padding: 9px 88px;
    border-radius: 4px;
    background: #720060;
    color: #fff;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    border: none;
    font-weight: 600;
    line-height: normal;
}

.buttonRightWomen {
    margin: 0;
    padding: 9px 88px;
    color: #720060;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    border-radius: 4px;
    border: 3px solid #720060;

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

.circleFullMen {
    width: 18px;
    height: 18px;
    background-color: #002772;
    border-radius: 50%;
}

.circleBorderMen {
    width: 18px;
    height: 18px;
    border: 1px solid #002772;
    border-radius: 50%;
}

.circleFullWomen {
    width: 18px;
    height: 18px;
    background-color: #720060;
    border-radius: 50%;
}

.circleBorderWomen {
    width: 18px;
    height: 18px;
    border: 1px solid #720060;
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