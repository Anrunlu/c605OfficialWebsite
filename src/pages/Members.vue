<template>
  <q-page class="q-my-xl">
    <div
      v-for="(group, index) in memberGroups"
      :key="index"
      class="row justify-center q-mt-lg"
    >
      <div class="col-10 q-gutter-lg text-center">
        <div
          class="person"
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
        name: "安润鲁",
        avatar: "https://cyberdownload.anrunlu.net/zhixin2.1shot/arl6.png",
        position: "系统架构负责人",
        description: "",
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
