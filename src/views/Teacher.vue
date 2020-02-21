<template>
  <div>
    <br>
    <span class="bd-content-title,float-left" ><strong style="font-size: 20px">อาจารย์ที่ปรึกษา</strong></span>
    <b-button
      variant="success"
      class="float-right"
      @click="addNewUser"
      v-b-modal.modal-form-user
      ><b-icon icon="plus" font-scale="1"></b-icon> เพิ่มอาจารย์ที่ปรึกษา</b-button
    >
    <b-button
      variant="success"
      style="margin-right: 20px"
      class="float-right"
      @click="exal"
      v-b-modal.modal-form-user
      >เพิ่มอาจารย์ที่ปรึกษาแบบอัพโหลด excel</b-button
    >
    <b-modal
      id="modal-form-user"
      ref="modal-form-user"
      :title="title"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="รหัสอาจารย์ :"
          label-for="teacher"
        >
          <b-form-input id="company" v-model="form.teacher" required></b-form-input>
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
          label="หมายเลขโทรศัพท์ :"
          label-for="tel"
        >
          <b-form-input id="tel" v-model="form.tel" required></b-form-input>
        </b-form-group>
      </form>
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
    </b-modal>
    <b-table class="mt-3" striped hover :items="userList" :fields="fields">
      <template v-slot:cell(operation)="data">
        <!-- <b-button @click="viewUser(data)">View</b-button> -->
        <b-button variant="info" @click="viewUser(data.item)"><b-icon icon="eye" font-scale="1"></b-icon> View</b-button>
  <!-- <b-modal id="modal-form-user" hide-footer>
    <template v-slot:modal-title>
      ดูข้อมูลนิสิต
    </template>
    <div class="d-block text-center">
      <p style="float:left">ชื่อสถานประกอบการ : {{data.item.company}}</p><br>
    </div>
    <b-button class="mt-3" block @click="$bvModal.hide('modal-form-user')">Close Me</b-button>
  </b-modal> -->
        &nbsp;
        <b-button variant="warning" @click="editUser(data.item)"><b-icon icon="gear-wide-connected" font-scale="1"></b-icon> Edit</b-button>
        &nbsp;
        <b-button variant="danger" @click="delUser(data.item)"><b-icon icon="trash" font-scale="1"></b-icon> Delete</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'เพิ่มอาจารย์ที่ปรึกษา',
      form: {
        id: -1,
        teacher: '',
        name: '',
        surname: '',
        fullname: '',
        tel: ''
      },
      userList: [
        {
          id: 1,
          teacher: ' 38160077',
          fullname: 'สมศรี สายเสมอ',
          tel: '0956437723'
        }
      ],
      lastId: 2,
      fields: [
        {
          key: 'id',
          label: 'ลำดับ'
        },
        {
          key: 'teacher',
          label: 'รหัสอาจารย์'
        },
        {
          key: 'fullname',
          label: 'ชื่อ-นามสกุล'
        },
        {
          key: 'tel',
          label: 'หมายเลขโทรศัพท์'
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
      this.title = 'เพิ่มอาจารย์ที่ปรึกษา'
      this.$bvModal.show('modal-form-user')
    },
    viewUser (user) {
      console.log('view')
      console.log(user)
      this.title = 'ดูข้อมูลอาจารย์ที่ปรึกษา'
      this.form = { ...user }
      // this.form.id = user.id
      this.$bvModal.show('modal-form-user')
    },
    editUser (user) {
      console.log('Edit ')
      console.log(user)
      this.title = 'แก้ไขอาจารย์ที่ปรึกษา'
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
        teacher: '',
        name: '',
        surname: '',
        fullname: '',
        tel: ''
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
        this.addUser(this.form)
        this.viewUser(this.form)
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
