<template>
  <section class="wrapper">
    <div class="form-box">
      <form>
        <div class="form-item">
          <label for="email">Email</label>
          <input type="email" id="email" required v-model="email.val" />
          <p v-if="!email.isValid" class="error">{{ email.reason }}</p>
        </div>
        <div class="form-item">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            required
            v-model="password.val"
          />
          <p v-if="!password.isValid" class="error">{{ password.reason }}</p>
        </div>
        <div class="form-item">
          <base-button class="btn" @click.prevent="submitData"
            >Login</base-button
          >
          <p class="login-text">
            Don't have an account?
            <router-link to="/signup">Signup</router-link>
          </p>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: {
        val: "",
        isValid: true,
        reason: null,
      },
      password: {
        val: "",
        isValid: true,
        reason: null,
      },
    };
  },
  methods: {
    validatePassword() {
      if (this.password.val === "") {
        this.password.isValid = false;
        this.password.reason = "Please enter a password";
        return false;
      }
      this.password.isValid = true;
      this.password.reason = null;
      return true;
    },
    validateEmail() {
      // replace with regex
      if (this.email.val === "") {
        this.email.isValid = false;
        this.email.reason = "Please enter your email address";
        return false;
      }
      this.email.isValid = true;
      this.email.reason = null;
      return true;
    },
    async submitData() {
      if (this.validateEmail() && this.validatePassword()) {
        try {
          await this.$store.dispatch("login", {
            email: this.email.val,
            password: this.password.val,
          });
          this.$router.replace("/me");
        } catch (err) {
          alert("ERROR");
        }

        //
        //
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  padding: 1rem;
}
.form-box {
  margin: 100px auto;
  max-width: 40rem;
  padding: 5rem 1rem;
  box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 2rem;
}
.form-item {
  display: flex;
  flex-direction: column;
  min-height: 7rem;
  gap: 0.5rem;
}
label {
  font-size: 2rem;
  color: #524c59;
}
input {
  outline: none;
  height: 3rem;
  width: 100%;
  font-size: 2rem;
  color: #524c59;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 2rem 0.5rem;
  transition: 0.4s ease;
}

input:focus {
  border: 1px solid #524c59;
}

.btn {
  margin-top: 1rem;
}
.error {
  font-size: 1.2rem;
  color: rgb(206, 1, 1);
}

.login-text {
  margin-top: 5px;
  font-size: 1.2rem;
}

a:link,
a:visited {
  text-decoration: none;
  font-weight: 700;
  color: #524c59;
}
</style>
