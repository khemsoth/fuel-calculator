<template>
  <div>
    <h2 class="text-2xl mb-8 font-semibold">Login</h2>
      <form class="login-form">
        <div class="input-cont">
          <label for="email">Email: </label>
          <input class="textbox" type="email" name="email">
        </div>

        <div class="input-cont">
          <label for="password">Password: </label>
          <input class="textbox" type="password" name="password">
        </div>

        <input class="calc-btn mt-5 p-2 w-1/5 self-end rounded-lg bg-white text-custom-blue hover:bg-custom-brown hover:border-custom-tan hover: border hover:text-custom-tan" type="button" value="Submit">

      </form>
  </div>
</template>

<script>
export default {

}
</script>

<style>

  .login-form {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 50vw;
  }

  .input-cont {
    margin: .2rem auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 50%;
  }

  .textbox {
    border: #888 solid 1px;
    width: 70%;
  }

</style>