<template>
  <q-page class="q-my-lg">
    <div class="row justify-center">
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
            :name="index"
            :img-src="img"
            v-for="(img, index) in imgList"
            :key="index"
          />
        </q-carousel>
      </div>
    </div>

    <div class="row justify-center q-mt-md">
      <div class="col-11 col-md-10">
        <div class="q-pa-md bg-grey-1">
          <h5 class="text-center">{{ slogan }}</h5>
          <div v-html="description" class="text-body1"></div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
const imgList = [
  "https://cyberdownload.anrunlu.net/2021412977-1671454094549.jpg",
  "https://cyberdownload.anrunlu.net/2021412977-1671454225259.jpg",
  "https://cyberdownload.anrunlu.net/2021412977-1671454997128.jpg",
  "https://cyberdownload.anrunlu.net/zhixin2.1shot/IMG_20210919_101821.jpg",
  "https://cyberdownload.anrunlu.net/zhixin2.1shot/17thtiaozhanbei.png",
  "https://cyberdownload.anrunlu.net/zhixin2.1shot/IMG_20211103_165151.jpg",
];

export default {
  name: "Index",
  data() {
    return {
      autoplay: true,
      slide: 0,
      imgList,
      // 标语
      slogan: "知识改变命运，奋斗成就未来",
      // 团队描述
      description: `<p>
            &emsp;&emsp; 曲阜师范大学网络空间安全学院数字大脑团队在学院的大力支持和帮助下致力于推动 AI
            技术与 Web
            技术的融合应用，加速我校数字化转型速度，助推我校教育信息化技术、生态的融合创新及产学研发展，推进我校“智能+教育”的创新升级，为我校“双一流”“双高”建设等教育强国与人才强国建设目标的实现做出一定的贡献。
            <br />
            &emsp;&emsp;
            团队目前已形成以数字化教学平台为支撑的业务主线，服务师生超过 1.6
            万人，涉及教学、科研、管理、服务等多个领域，已形成了一套完整的教学管理体系，为我校教学管理提供了一套可靠的技术支撑。
          </p>`,
    };
  },
};
</script>
