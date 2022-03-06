<template>
  <div  class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3 py-5">
        <h1>Generate change</h1>

        <form v-on:submit.prevent="makeWebsiteThumbnail">
          <div class="form-group">
            <input v-model="websiteUrl" type="text" id="website-input" placeholder="Enter a website" class="form-control">
          </div>
          <div class="form-group">
            <button class="btn btn-primary">Generate in another place!</button>
          </div>
        </form>
        <img :src="thumbnailUrl"/>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'App',

  data() { return {
    websiteUrl: '',
    thumbnailUrl: '',
  } },

  methods: {
    makeWebsiteThumbnail() {
      let hostName = location.hostname
      axios.post("http://"+hostName+":9090/api/thumbnail", {
        url: this.websiteUrl,
      }).then((response) => {
        this.thumbnailUrl = response.data.screenshot;
      })
          .catch((error) => {
            window.alert(`The API returned an error: ${error}`);
          })
    }
  }
}
</script>
