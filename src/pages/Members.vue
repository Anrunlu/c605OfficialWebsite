<template>
  <q-page class="q-my-xl">
    <div
      v-for="(group, index) in memberGroups"
      :key="index"
      class="row justify-center q-mt-lg"
    >
      <div class="col-10 q-gutter-lg text-center">
        <div
          class="person cursor-pointer"
          v-for="(person, index2) in group.members"
          :key="index2"
        >
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
const memberGroups2 = [
  {
    groupName: "负责人",
    groupLevel: 1,
    members: [
      {
        name: "周子力",
        avatar:
          "https://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
        position: "负责人",
        description: "",
      },
    ],
  },
  {
    groupName: "系统架构负责人",
    groupLevel: 2,
    members: [
      {
        name: "安润鲁",
        avatar: "https://cyberdownload.anrunlu.net/zhixin2.1shot/arl6.png",
        position: "系统架构负责人",
        description: "",
      },
    ],
  },
  {
    groupName: "开发人员",
    groupLevel: 3,
    members: [
      {
        name: "李林",
        avatar:
          "https://cyberdownload.anrunlu.net/2021412977-1671455153304.jpg",
        position: "全栈开发",
        description: "",
      },
      {
        name: "徐沛玉",
        avatar:
          "https://cyberdownload.anrunlu.net/2021412977-1671455126431.jpg",
        position: "前端开发",
        description: "",
      },
      {
        name: "张珠琛",
        avatar:
          "https://cyberdownload.anrunlu.net/2021412977-1671455184591.jpg",
        position: "前端开发",
        description: "",
      },
      {
        name: "田丰",
        avatar:
          "https://cyberdownload.anrunlu.net/2021412977-1671455199522.jpg",
        position: "前端开发",
        description: "",
      },
      {
        name: "王寒寒",
        avatar: "http://cyberdownload.anrunlu.net/2021412977-1671455214709.jpg",
        position: "前端开发",
        description: "",
      },
    ],
  },
];
const memberGroups = [
  {
    groupName: "负责人",
    groupLevel: 1,
    members: [
      {
        name: "周子力",
        avatar:
          "https://cyberdownload.anrunlu.net/2021412977-1671455059780.png",
        position: "负责人",
        description: "",
      },
    ],
  },
  {
    groupName: "系统架构负责人",
    groupLevel: 2,
    members: [
      {
        name: "张三",
        avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
        position: "系统架构负责人",
        description: "",
      },
    ],
  },
  {
    groupName: "开发人员",
    groupLevel: 3,
    members: [
      {
        name: "李四",
        avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
        position: "全栈开发",
        description: "",
      },
      {
        name: "王五",
        avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
        position: "前端开发",
        description: "",
      },
      {
        name: "赵六",
        avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
        position: "前端开发",
        description: "",
      },
      {
        name: "孙七",
        avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
        position: "前端开发",
        description: "",
      },
      {
        name: "周八",
        avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
        position: "前端开发",
        description: "",
      },
    ],
  },
];

export default {
  name: "Members",
  data() {
    return {
      memberGroups: memberGroups,
    };
  },
};
</script>
<style>
.person {
  display: inline-block;
}
</style>
