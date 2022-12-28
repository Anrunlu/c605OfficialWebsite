<template>
  <q-page class="q-my-xl">
    <!-- 一级(一行只有一个人) -->
    <div class="row justify-center">
      <div class="col-10 text-center">
        <div class="person">
          <q-avatar class="q-mx-auto shadow-1" size="110px">
            <q-img
              src="https://cyberdownload.anrunlu.net/2021412977-1671455059780.png"
              width="85%"
            />
          </q-avatar>
          <div class="name q-mt-sm text-subtitle1 text-weight-medium">张三</div>
          <div class="position">前端工程师</div>
        </div>
      </div>
    </div>

    <!-- 二级 -->
    <div class="row justify-center q-mt-xl">
      <div class="col-10 q-gutter-lg text-center">
        <div class="person" v-for="(person, index) in members" :key="index">
          <q-avatar class="q-mx-auto shadow-1" size="110px">
            <q-img :src="person.avatar" />
          </q-avatar>
          <div class="name q-mt-sm text-subtitle1 text-weight-medium">
            {{ person.name }}
          </div>
          <div class="position">{{ person.position }}</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Members",
  data() {
    return {
      members: [
        {
          name: "张三",
          avatar: "https://cdn.quasar.dev/img/avatar.png",
          position: "前端工程师",
          description: "我是张三，我是前端工程师",
        },
        {
          name: "李四",
          avatar: "https://cdn.quasar.dev/img/avatar.png",
          position: "后端工程师",
          description: "我是李四，我是后端工程师",
        },
        {
          name: "王五",
          avatar: "https://cdn.quasar.dev/img/avatar.png",
          position: "前端工程师",
          description: "我是王五，我是前端工程师",
        },
        {
          name: "赵六",
          avatar: "https://cdn.quasar.dev/img/avatar.png",
          position: "后端工程师",
          description: "我是赵六，我是后端工程师",
        },
      ],
    };
  },
};
</script>
<style>
.person {
  display: inline-block;
}
</style>
