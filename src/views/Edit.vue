<template>

  <main>
    <section class="sidenav">
      <ul>
        <router-link :to="getEditPath + '/edit'"
          ><li>Edit Profile</li></router-link
        >
        <router-link :to="getEditPath + '/changepassword'"
          ><li>Change Password</li></router-link
        >
        <router-link :to="getEditPath + '/Apps and Websites'"
          ><li>Apps and Websites</li></router-link
        >
        <router-link :to="getEditPath + '/Email and SMS'"
          ><li>Email and SMS</li></router-link
        >
        <router-link :to="getEditPath + '/Push Notifications'"
          ><li>Push Notifications</li></router-link
        >
        <router-link :to="getEditPath + '/Manage Contacts'"
          ><li>Manage Contacts</li></router-link
        >
        <router-link :to="getEditPath + '/Privacy and Security'"
          ><li>Privacy and Security</li></router-link
        >
        <router-link :to="getEditPath + '/Login Activity'"
          ><li>Login Activity</li></router-link
        >
        <router-link :to="getEditPath + '/Emails from Goalgram'"
          ><li>Emails from Goalgram</li></router-link
        >
      </ul>
    </section>
    <section class="mainBar">
      <router-view></router-view>
    </section>
  </main>
</template>

<script>
export default {
  computed: {
    getEditPath() {
      return `/${this.$route.params.id}/profile/edit`;
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  margin: 2rem auto;
  width: 100%;
  min-width: 25rem;
  max-width: 60rem;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    min-width: 100%;
    flex-direction: column;
  }

  section.sidenav {
    width: 30%;
    min-height: 108vh;
    height: 100%;
    background: #ffffff;
    border: 1px solid #cfcfcf;
    border-right: none;

    @media screen and (max-width: 768px) {
      min-width: 100%;
      min-height: 10vh;
      
    }

    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      list-style: none;

      @media (max-width: 768px) {
        flex-direction: row;
        flex-wrap: wrap;
      }

      a {
        padding: 1rem 1.6rem;
        border-left: 2px solid transparent;
        text-decoration: none;
        color: #8f8f8f;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 500;

        &:hover {
          background: #fafafa;
          border-left: 2px solid #dadada;
        }

        &.router-link-exact-active {
          border-left: 2px solid black;
          // background: #fafafa;
          color: #262626;

          @media screen and (max-width: 768px) {
            border-left: 0px solid black;
            border-top: 2px solid black;
          }

          // &:hover{
          //    background: #fafafa;
          // }
        }
      }
    }
  }

  section.mainBar {
    width: 70%;
    min-height: 100%;
    background: #ffffff;
    border: 1px solid #cfcfcf;
    height: 100%;
    
    @media (max-width: 768px) {
       width: 100%;
      }
  }
}
</style>