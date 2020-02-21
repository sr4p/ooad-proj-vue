<template>
  <div>
    <b-nav vertical class="w-15">
      <b-nav-item active><router-link to="/">Home</router-link></b-nav-item>
      <b-card header="การจัดการ">
    <b-list-group>
      <b-list-group-item href="#" style="text-align: center; font-size: 15px"><b-nav-item><router-link to="/student">Student</router-link></b-nav-item></b-list-group-item>
      <b-list-group-item href="#" style="text-align: center; font-size: 15px"><b-nav-item><router-link to="/partner">Partner</router-link></b-nav-item></b-list-group-item>
      <b-list-group-item href="#" style="text-align: center; font-size: 15px"><b-nav-item><router-link to="/teacher">Teacher</router-link></b-nav-item></b-list-group-item>
    </b-list-group>
  </b-card>
      <!-- <b-nav-item active><router-link to="/">Home</router-link></b-nav-item>
      <b-nav-item><router-link to="/student">Student</router-link></b-nav-item>
      <b-nav-item><router-link to="/partner">Partner</router-link></b-nav-item>
      <b-nav-item><router-link to="/teacher">Teacher</router-link></b-nav-item> -->
    </b-nav>
  </div>
</template>
