<template>
  <div>
    <br>
    <b-button
      variant="success"
      class="float-right"
      @click="addNewUser"
      v-b-modal.modal-form-user
      ><b-icon icon="plus" font-scale="1"></b-icon> เพิ่มสถานประกอบการ</b-button
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
          label="ชื่อสถานประกอบการ :"
          label-for="company"
        >
          <b-form-input id="company" v-model="form.company" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="ตัวแทนผู้ติดต่อ :"
          label-for="content"
        >
        <b-form-input id="content" v-model="form.content" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="หมายเลขโทรศัพท์ :"
          label-for="tel"
        >
          <b-form-input id="tel" v-model="form.tel" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="อีเมลล์ :"
          label-for="email"
        >
          <b-form-input id="email" v-model="form.email" required></b-form-input>
        </b-form-group>
        <b-form-group
          label="ที่อยู่ :"
          label-for="address"
        >
          <b-form-input id="address" v-model="form.address" required></b-form-input>
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
      title: 'เพิ่มสถานประกอบการ',
      form: {
        id: -1,
        company: '',
        content: '',
        tel: '',
        email: '',
        address: ''
      },
      userList: [
        {
          id: 1,
          company: 'คลิกซ์เน็กซ์',
          content: 'สมศรี สายเสมอ',
          tel: '0993537450'
        }
      ],
      lastId: 2,
      fields: [
        {
          key: 'id',
          label: 'ลำดับ'
        },
        {
          key: 'company',
          label: 'บริษัท'
        },
        {
          key: 'content',
          label: 'ตัวแทนผู้ติดต่อ'
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
      this.title = 'เพิ่มสถานประกอบการ'
      this.$bvModal.show('modal-form-user')
    },
    viewUser (user) {
      console.log('view')
      console.log(user)
      this.title = 'ดูข้อมูลสถานประกอบการ'
      this.form = { ...user }
      // this.form.id = user.id
      this.$bvModal.show('modal-form-user')
    },
    editUser (user) {
      console.log('Edit ')
      console.log(user)
      this.title = 'แก้ไขข้อมูลประกอบการ'
      this.form = { ...user }
      // this.form.id = user.id
      this.$bvModal.show('modal-form-user')
    },
    delUser (user) {
      console.log('Del ')
      console.log(user)
      this.$bvModal
        .msgBoxConfirm('ท่านต้องการลบ ' + user.company + ' หรือไม่?', {
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
        company: '',
        content: '',
        tel: '',
        email: '',
        address: ''
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
