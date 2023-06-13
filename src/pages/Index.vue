<template>
  <q-page class="q-my-lg">
    <div class="row justify-center">
      <div class="col-11 col-md-10">
        <q-carousel
          v-model="slide1"
          swipeable
          animated
          control-color="white"
          :thumbnails="!$q.platform.is.mobile"
          :arrows="$q.platform.is.mobile"
          :navigation="$q.platform.is.mobile"
          :autoplay="autoplay"
          @mouseenter="autoplay = false"
          @mouseleave="autoplay = true"
          :height="$q.platform.is.mobile ? '20vh' : '84vh'"
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

    <div class="row justify-center q-mt-lg">
      <q-card class="col-11 col-md-10 no-shadow">
        <div>
          <h5 class="text-center">
            <a class="zXinSheQv" href="https://bbs.z-xin.net/" target="_blank">
              知新社区
            </a>
          </h5>

          <div class="justify-center q-mt-md row justify-around">
            <div class="imgStyle">
              <q-img
                src="https://cyberdownload.anrunlu.net/FnTWekVKK0wuRnj-nX5Jd-oYnVHP"
              >
              </q-img>
            </div>
            <div class="imgsStyle">
              <q-carousel
                v-model="slide2"
                swipeable
                animated
                control-color="white"
                :thumbnails="!$q.platform.is.mobile"
                :arrows="$q.platform.is.mobile"
                :navigation="$q.platform.is.mobile"
                :autoplay="false"
                @mouseenter="autoplay = false"
                @mouseleave="autoplay = true"
                :height="$q.platform.is.mobile ? '20vh' : '55vh'"
                class="bg-primary text-white rounded-borders"
              >
                <q-carousel-slide
                  :name="index"
                  :img-src="img"
                  v-for="(img, index) in imgListCommunity"
                  :key="index"
                />
              </q-carousel>
            </div>
          </div>
        </div>
      </q-card>
    </div>

    <div class="row justify-center q-mt-lg">
      <q-card class="col-11 col-md-10 no-shadow">
        <div>
          <h5 class="text-center">WebLab创新社</h5>
          <div class="justify-center q-mt-md row justify-around">
            <div class="imgStyle">
              <q-img
                src="https://cyberdownload.anrunlu.net/FhAnBZQ3MoyTeM92Lt9B_yiZUszr"
              >
              </q-img>
            </div>
            <div class="imgsStyle">
              <q-carousel
                v-model="slide3"
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
                class="bg-primary text-white rounded-borders"
              >
                <q-carousel-slide
                  :name="index"
                  :img-src="img"
                  v-for="(img, index) in imgListClub"
                  :key="index"
                />
              </q-carousel>
            </div>
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
//主页轮播图大照片
const imgList = [
  "https://cyberdownload.anrunlu.net/Fh6PfbkbUEA-KM8h3YryQfAyhimc",
  "https://cyberdownload.anrunlu.net/Fn_k81SysKrchQn9E8RCknu_ybCC",
  "https://cyberdownload.anrunlu.net/Fn8NsPSj0Re3zgBPudZgBepOLFSl",
  // "https://cyberdownload.anrunlu.net/lv_aKPAt-VveEV60arUdjrMlhqqf",
  "https://cyberdownload.anrunlu.net/FrrNPlQ1KSURXoHQxcbsqHGNOhUI",
  // "https://cyberdownload.anrunlu.net/lpEj-ERc9VUV0uyPP0HQ00LL12jF",
  "https://cyberdownload.anrunlu.net/zhixin2.1shot/17thtiaozhanbei.png",
  "https://cyberdownload.anrunlu.net/luayEv10Zeo2RRpr8Q460xleJZPE",
  // "https://cyberdownload.anrunlu.net/lkaCM3GnkeuvNjmizmbz7H0VeBDp",
  // "https://cyberdownload.anrunlu.net/FqqVbq1xE87lIwJM0Lc11JgQAtci",
];

//知新社区照片
const imgListCommunity = [
  "https://cyberdownload.anrunlu.net/FuEErnrBhDppLxePpPk69TQ8W2Ud",
  "https://cyberdownload.anrunlu.net/FmIMvjeN9FK-zSVNyFzFf8NKl_6F",
  "https://cyberdownload.anrunlu.net/FsXHaIe6UlP36cIULYNbpcRPRChb",
  "https://cyberdownload.anrunlu.net/FvbRx2KxVE4O526m_7f0zEPtXIof",
];
const imgListClub = [
  "https://cyberdownload.anrunlu.net/Fr7tzUw3-lHKoGR5JFPQnJDa1z9F",
];

export default {
  name: "Index",
  data() {
    return {
      autoplay: true,
      slide1: 0,
      slide2: 0,
      slide3: 0,
      imgList,
      imgListCommunity,
      imgListClub,
      // 标语
      slogan: "知识改变命运，奋斗成就未来",
      // 团队描述
      description: `<p>
            &emsp;&emsp; 曲阜师范大学网络空间安全学院认知智能实验室在学院的大力支持和帮助下致力于推动 AI
            技术与 Web
            技术的融合应用，加速我校数字化转型速度，助推我校教育信息化技术、生态的融合创新及产学研发展，推进我校“智能+教育”的创新升级，为我校“双一流”“双高”建设等教育强国与人才强国建设目标的实现做出一定的贡献。
            <br/>
            &emsp;&emsp;
            团队目前已形成以数字化教学平台为支撑的业务主线，服务师生超过 1.6
            万人，涉及教学、科研、管理、服务等多个领域，已形成了一套完整的教学管理体系，为我校教学管理提供了一套可靠的技术支撑。
          </p>`,
    };
  },

  methods: {
    // Scrollbottom() {
    //   let scrollTop =
    //     document.documentElement.scrollTop || document.body.scrollTop;
    //   let clientHeight = document.documentElement.clientHeight;
    //   let scrollHeight = document.documentElement.scrollHeight;
    //   if (scrollTop + clientHeight >= scrollHeight) {
    //     this.$router.push("/projects");
    //   }
    // },
  },

  // created() {
  //   window.addEventListener("scroll", this.Scrollbottom); //页面加载时监听滚动事件
  // },

  // destroyed() {
  //   window.removeEventListener("scroll", this.Scrollbottom); //页面离开后销毁监听事件
  // },
};
</script>
<style>
.zXinSheQv {
  text-decoration: none;
  color: black;
}
.imgStyle {
  width: 30%;
}
.imgsStyle {
  width: 65%;
}
</style>
