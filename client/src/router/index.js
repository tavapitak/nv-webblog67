import Vue from 'vue'
import Router from 'vue-router'

import UserIndex from '@/components/User/index'
import UserEdit from '@/components/User/EditUser'
import UserCreate from '@/components/User/CreateUser'
import UserShow from '@/components/User/ShowUser'
import Login from '@/components/Login'

import CommentIndex from '@/components/Comments/index' 

import TentList from '@/components/Tents/TentList.vue';
import TentCreate from '@/components/Tents/TentCreate.vue';
import TentEdit from '@/components/Tents/TentEdit.vue';
import TentDetails from '@/components/Tents/TentDetails.vue';

import Upload from '@/components/Util/Upload'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/user/edit/:userId',
      name: 'user-edit',
      component: UserEdit
    },
    {
      path: '/user/create',
      name: 'user-create',
      component: UserCreate
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: UserShow
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/tents',
      name: 'TentList',
      component: TentList
    },
    {
      path: '/tents/create',
      name: 'TentCreate',
      component: TentCreate
    },
    {
      path: '/tents/edit/:id',
      name: 'TentEdit',
      component: TentEdit
    },
    {
      path: '/tents/:id',
      name: 'TentDetails',
      component: TentDetails
    },
    {
      path: '/comments',
      name: 'comments',
      component: CommentIndex
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
  ]
})
