<template>
  <q-page>
    <div class="row justify-center q-mt-md">
      <div class="col-11 col-md-10">
        <q-carousel
          v-model="slide"
          swipeable
          animated
          control-color="white"
          :thumbnails="!$q.platform.is.mobile"
          :arrows="$q.platform.is.mobile"
          :navigation="$q.platform.is.mobile"
          :autoplay="autoplay"
          @mouseenter="autoplay = false"
          @mouseleave="autoplay = true"
          :height="$q.platform.is.mobile ? '20vh' : '55vh'"
          class="bg-primary text-white shadow-1 rounded-borders"
        >
          <q-carousel-slide
            :name="1"
            img-src="https://cyberdownload.anrunlu.net/2021412977-1671454094549.jpg"
          />
          <q-carousel-slide
            :name="2"
            img-src="https://cyberdownload.anrunlu.net/2021412977-1671454225259.jpg"
          />
          <q-carousel-slide
            :name="3"
            img-src="https://cyberdownload.anrunlu.net/2021412977-1671454974728.jpg"
          />
          <q-carousel-slide
            :name="4"
            img-src="https://cyberdownload.anrunlu.net/2021412977-1671454997128.jpg"
          />
          <q-carousel-slide
            :name="5"
            img-src="https://cyberdownload.anrunlu.net/zhixin2.1shot/17thtiaozhanbei.png"
          />
        </q-carousel>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      autoplay: true,
      slide: 1,
    };
  },
};
</script>
