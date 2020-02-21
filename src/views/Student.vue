<template>
  <div>
    <br>
    <b-button
      variant="success"
      class="float-right"
      @click="addNewUser"
      v-b-modal.modal-form-user
      ><b-icon icon="plus" font-scale="1"></b-icon> เพิ่มนิสิต</b-button
    >
    <b-button
      variant="success"
      style="margin-right: 20px"
      class="float-right"
      @click="exal"
      v-b-modal.modal-form-user
      >เพิ่มนิสิตแบบอัพโหลด excel</b-button
    >
    <br>
    <b-modal
      id="modal-form-user"
      ref="modal-form-user"
      :title="title"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="รหัสนิสิต :"
          label-for="userid"
        >
          <b-form-input id="userid" v-model="form.userid" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="รหัสผ่าน :"
          label-for="password"
        >
        <b-form-input id="password" v-model="form.password" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="ยืนยันรหัสผ่าน :"
          label-for="confirmPassword"
        >
          <b-form-input id="password" v-model="form.confirmPassword" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="ชื่อ :"
          label-for="name"
        >
          <b-form-input id="name" v-model="form.name" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="นามสกุล :"
          label-for="surname"
        >
          <b-form-input id="surname" v-model="form.surname" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="ชื่อ-นามสกุล :"
          label-for="fullname"
        >
          <b-form-input id="fullname" :vaue="form.name+form.surname" lv-model="form.fullname" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="สาขา :"
          label-for="major"
        >
          <b-form-input id="major" v-model="form.major" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="ชั้นปี :"
          label-for="year"
        >
          <b-form-input id="year" v-model="form.year" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="หน่วยกิตที่ผ่าน :"
          label-for="unit"
        >
          <b-form-input id="unit" v-model="form.unit" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="GPAX :"
          label-for="gpax"
        >
          <b-form-input id="gpax" v-model="form.gpax" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="88510059 การคิดและการแก้ปัญหาเชิงตรรกะเพื่อการสร้างนวัตกรรม :"
          label-for="logical"
        >
          <b-form-input id="logical" v-model="form.subject[0].logical" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="88510259 โครงสร้างดิสครีต :"
          label-for="dis"
        >
          <b-form-input id="dis" v-model="form.subject[1].dis" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="88510459 หลักกการโปรแกรม :"
          label-for="programming"
        >
          <b-form-input id="programming" v-model="form.subject[2].programming" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="88620159 หลักการโปรแกรมเชิงวัตถุ :"
          label-for="oord"
        >
          <b-form-input id="oord" v-model="form.subject[3].oord" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="88620259 ฐานข้อมูลเชิงสัมพันธ์ :"
          label-for="sql"
        >
          <b-form-input id="sql" v-model="form.subject[4].sql" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="88620359 ฐานข้อมูลไม่สัมพันธ์ :"
          label-for="nosql"
        >
          <b-form-input id="nosql" v-model="form.subject[5].nosql" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="88620459 วิทยาศาสตร์ข้อมูลเบื้องต้นและการวิเคราะห์ข้อมูล :"
          label-for="data"
        >
          <b-form-input id="data" v-model="form.subject[6].data" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="88621159 โตงสร้างข้อมูลและอัลกอริทึม :"
          label-for="algo"
        >
          <b-form-input id="algo" v-model="form.subject[7].algo" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="88631159 การออกแบบขั้นตอนวิธีและการประยุกต์ :"
          label-for="structure"
        >
          <b-form-input id="structure" v-model="form.subject[8].structure" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="88634159 การพัฒนาซอฟต์แวร์ :"
          label-for="develop"
        >
          <b-form-input id="develop" v-model="form.subject[9].develop" required></b-form-input>
        </b-form-group>
      </form>
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
    </b-modal>
    <b-table striped hover :items="userList" :fields="fields">
      <template v-slot:cell(operation)="data">
        <!-- <b-button @click="viewUser(data)">View</b-button> -->
        <b-button variant="info" @click="viewUser(data.item)"><b-icon icon="eye" font-scale="1"></b-icon> View</b-button>
  <!-- <b-modal id="modal-form-user" hide-footer>
    <template v-slot:modal-title>
      ดูข้อมูลนิสิต
    </template>
    <div class="d-block text-center">
      <p style="float:left">รหัสนิสิต : {{data.item.id}}</p><br>
    </div>
    <b-button class="mt-3" block @click="$bvModal.hide('modal-form-user')">Close Me</b-button>
  </b-modal> -->
        &nbsp;
        <b-button variant="warning" @click="editUser(data.item)"><b-icon icon="gear-wide-connected" font-scale="1"></b-icon> Edit</b-button>
        &nbsp;
        <b-button  variant="danger" @click="delUser(data.item)"><b-icon icon="trash" font-scale="1"></b-icon> Delete</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'เพิ่มนิสิต',
      form: {
        id: -1,
        userid: '',
        password: '',
        confirmPassword: '',
        name: '',
        surname: '',
        fullname: '',
        major: '',
        unit: '',
        gpax: '',
        year: '',
        subject: [
          { logical: '' },
          { dis: '' },
          { programming: '' },
          { oord: '' },
          { sql: '' },
          { nosql: '' },
          { data: '' },
          { algo: '' },
          { structure: '' },
          { develop: '' }
        ]
      },
      userList: [
        {
          id: 1,
          userid: '59161126',
          fullname: 'สิรวิชย์ ราญรอน',
          major: 'computer-Sci',
          year: '3'
        }
      ],
      lastId: 2,
      fields: [
        {
          key: 'id',
          label: 'ลำดับ'
        },
        {
          key: 'userid',
          label: 'รหัสนิสิต'
        },
        {
          key: 'fullname',
          label: 'ชื่อ-นามสกุล'
        },
        {
          key: 'major',
          label: 'สาขา'
        },
        {
          key: 'year',
          label: 'ชั้นปี'
        },
        {
          key: 'operation',
          label: 'เพิ่มเติม'
        }
      ]
    }
  },
  methods: {
    addNewUser: function () {
      console.log('Add new user')
      this.title = 'เพิ่มนิสิต'
      this.$bvModal.show('modal-form-user')
    },
    viewUser (user) {
      console.log('view')
      console.log(user)
      this.title = 'ดูข้อมูลนิสิต'
      this.form = { ...user }
      // this.form.id = user.id
      this.$bvModal.show('modal-form-user')
    },
    editUser (user) {
      console.log('Edit ')
      console.log(user)
      this.title = 'แก้ไขข้อมูลนิสิต'
      this.form = { ...user }
      // this.form.id = user.id
      this.$bvModal.show('modal-form-user')
    },
    delUser (user) {
      console.log('Del ')
      console.log(user)
      this.$bvModal
        .msgBoxConfirm('ท่านต้องการลบ ' + user.name + ' หรือไม่?', {
          title: 'กรุณายืนยัน',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.deleteUser(user)
          }
        })
    },
    resetModal () {
      this.form = {
        id: -1,
        userid: '',
        password: '',
        confirmPassword: '',
        name: '',
        surname: '',
        fullname: '',
        major: '',
        unit: '',
        gpax: '',
        subject: [
          { logical: '' },
          { dis: '' },
          { programming: '' },
          { oord: '' },
          { sql: '' },
          { nosql: '' },
          { data: '' },
          { algo: '' },
          { structure: '' },
          { develop: '' }
        ]
      }
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      if (this.form.id > 0) {
        this.updateUser(this.form)
      } else {
        this.viewUser(this.form)
        this.addUser(this.form)
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-form-user')
      })
    },
    addUser (user) {
      user.id = this.lastId++
      this.userList.push(user)
    },
    updateUser (user) {
      const index = this.userList.findIndex(item => item.id === user.id)
      this.userList.splice(index, 1, user)
    },
    deleteUser (user) {
      const index = this.userList.findIndex(item => item.id === user.id)
      this.userList.splice(index, 1)
    }
  },
  computed: {
    stateName () {
      return this.form.name.length >= 2
    },
    invalidFeedbackName () {
      if (this.form.name.length > 2) {
        return ''
      } else if (this.form.name.length > 0) {
        return 'ชื่อต้องมีขนาดอย่างน้อย 2 ตัวอักษร'
      } else {
        return 'ต้องใส่ชื่อ'
      }
    },
    validFeedbackName () {
      return this.stateName === true ? 'สำเร็จ' : ''
    },
    stateGender () {
      return this.form.gender != null
    },
    invalidFeedbackGender () {
      if (this.form.gender != null) {
        return ''
      } else {
        return 'กรุณาเลือกเพศ'
      }
    },
    validFeedbackGender () {
      return this.stateGender === true ? 'สำเร็จ' : ''
    }
  }
}
</script>
