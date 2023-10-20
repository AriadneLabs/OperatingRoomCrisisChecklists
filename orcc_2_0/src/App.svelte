<script>
  import router from "page";
  import routes from "./routes.js";
  import { onMount } from "svelte";
  import Home from "./pages/Home.svelte";

  let page;
  let params;

  let mobileOK = false;

  $: isMobile = mobileOK;

  // Iterate through the routes
  routes.forEach((route) => {
    router(
      route.path,

      (ctx, next) => {
        params = ctx.params;
        next();
      },

      () => {
        page = route.component;
      }
    );
  });

  // Start the router
  router.start();

  onMount(async () => {
    await initializeAuth0({ onRedirectCallback });
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      isMobile = true;
    }
  });
</script>

  <nav class="navbar-container">
    <div class="nav-item nav-home"><a href="/" style="text-align: center;"><i class="fa-solid fa-home fa-xs" style="color: white;" />
      <h6 style="     
      font-family: &quot;Source Sans Pro&quot;, sans-serif;
      color: #ffffff;
      text-decoration: none;
      text-align: center;
  ">HOME
  </h6>
    </a></div>
    <div class="nav-item nav-title"><a href="/" class="navbar-title bold">Operating Room Crisis Checklists</a></div>
    <div class="nav-item nav-logo"><img src="../../build/images/ariadne_logo.svg" alt="Ariadne Logo"></div>
    <!-- <div class="al-logo" /> -->
  </nav>
  <main>
    {#if page == Home}
      <Home />
    {:else}
      <svelte:component this={page} {params} />
    {/if}
  </main>

<style>
  /* @import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;700&display=swap"); */
  main {
    /* font-family: "Source Sans Pro", sans-serif; */
    overflow-x: hidden;
    padding-top: 60px;
  }

  .main-title {
    padding-left: 10vw;
    padding-top: 8vh;
    font-family: "Source Sans Pro", sans-serif;
    font-size: 5.8em;
    color: #f37420;
  }
  .orange-strip {
    background-color: #f37420;
    height: 4px;
    margin-bottom: 5vh;
  }
  .lg-orange-strip {
    background-color: #f37420;
    height: 140px;
    margin-bottom: 15vh;
    color: #ffffff;
    padding-left: 8vw;
    padding-top: 45px;
    font-size: 28px;
  }
  .home-page-image {
    width: 100%;
    height: 20em;
    margin-left: 7vw;
    margin-bottom: 5vh;
    background: url("images/app_home.png");
    background-repeat: no-repeat;
    background-size: 90%;
  }
  .margins {
    margin-left: 8vw;
    margin-right: 8vw;
  }
  .login-btn-container {
    z-index: auto;
    height: 24em;
    width: 100%;
    margin-top: -10vh;
    position: relative;
  }
  .login-btn-bgd {
    z-index: 0;
    background-color: #ffffff;
    border-radius: 30px;
    width: 100%;
    height: 100%;
    opacity: 0.85;
    position: absolute;
  }
  .blue-btn-bgd {
    z-index: 1;
    opacity: 1;
    background-color: #00acc5;
    margin-top: 12em;
    height: 12em;
    width: 100%;
    border-radius: 0 0 30px 30px;
    position: absolute;
  }
  .login-btns {
    z-index: 2;
    border: none;
    border-radius: 40px;
    font-size: 24px;
    font-weight: 400;
    padding: 10px;
    position: absolute;
    line-height: 1.2;
  }
  .login {
    margin-top: 3.5em;
    background-color: #f37420;
    color: #ffffff;
    width: 50%;
    margin-left: 25%;
  }
  .new-account {
    text-align: center;
    text-decoration: none;
    margin-top: 3em;
    background-color: #ffffff;
    color: #f37420;
    width: 70%;
    margin-left: 15%;
  }
  .info-text {
    padding-left: 8vw;
    padding-bottom: 4vh;
    color: #00acc5;
    font-size: 42px;
    font-weight: 400;
  }
  h1 {
    color: #f37420;
    font-size: 24px;
    font-weight: 700;
  }
  .paragraphs {
    padding-left: 14vw;
    padding-right: 14vw;
    padding-bottom: 10vh;
    color: #5b5d62;
    font-size: 22px;
    font-weight: 400;
  }
  .end {
    padding-bottom: 15vh;
  }

  nav {
    position: fixed;
    width: 100%;
    z-index: 100;
  }
  .navbar-container {
    background-color: #f37420;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 60px;
    border-bottom: solid #787878 1px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .nav-home {
    flex: 1;
    justify-content: flex-start;
    align-items: center;
  }

  .nav-title {
    flex: 4;
    justify-content: center;
    text-align: center;
  }

  .nav-logo {
    flex: 1;
    justify-content: flex-end;
  }

  .nav-home a {
    color: white;
    font-size: 30px;
    padding: 0 10%;
  }

  .nav-title a {
    font-size: min(4vw, 38px);
    font-family: "Source Sans Pro", sans-serif;
    color: #ffffff;
    text-decoration: none;
  }

  .nav-logo img {
    height: 80%;
    max-width: 100%;
    padding: 0 10%;
    box-sizing: border-box;
  }

  .menu-btn {
    color: #ffffff;
    background-color: transparent;
    border: 0;
    font-size: 34px;
    margin-top: -6px;
    margin-left: -3vw;
  }
  .invisible {
    color: transparent;
    background-color: transparent;
    border: 0;
    font-size: 34px;
    margin-top: -6px;
    margin-left: -3vw;
  }

  .bold {
    font-weight: 400;
  }
  .unbold {
    font-weight: 300;
  }
  .fa-xs {
    font-size: 0.65em;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @media (max-width: 575px) {
    .al-logo {
      background: none;
    }
    .info-text {
      padding-left: 14vw;
      padding-right: 14vw;
      font-size: 32px;
    }
    h1 {
      font-size: 18px;
    }
    .paragraphs {
      font-size: 16.5px;
    }
  }
  @media (max-width: 767px) {
    .navbar-title {
      font-size: 28px;
    }
    .menu-btn {
      font-size: 25px;
      margin-top: -5px;
    }
    .al-logo {
      background-size: 82px;
      margin-top: 14px;
      margin-left: -2vw;
    }
    .home-page-image {
      background: none;
      height: 6vh;
    }
    .lg-orange-strip {
      height: 120px;
      padding-top: 40px;
      font-size: 22px;
    }
  }
  @media (max-width: 1000px) {
    .al-logo {
      margin-right: 0px;
    }
    .main-title {
      font-size: 4em;
    }
  }
  @media print {
    .navbar-container {
      display: none;
    }
  }
</style>
