<template>
  <div class="card">
      <header>
          <img :src="authorURL" alt="">
          <div class="author"><span> <router-link :to="getPath">{{ author }} </router-link> </span></div>
      </header>
      <body>
          <img :src="imageURL" alt="">
      </body>
      <footer>
          <div class="actions">
              <div class="action1">
              <Heart />
              <Comment />
              <Airplane />
              </div>
              <div class="action2">
                  <Bookmark />
              </div>
          </div>
          <div class="likes">
              <span>{{ likes }} Likes</span>
          </div>
          <div class="caption">
              <span>{{author}}</span><p>{{caption}}</p>
          </div>
          <div class="view-comments">
              <p>View all <span> {{numberOfComments}} </span> comments</p>
          </div>
          <div class="top-comment">
              <span>{{topCommentAuthor}}</span><p>{{topComment}}</p>
          </div>
          <div class="time"><span>{{time}}</span> DAY AGO</div>
      </footer>
      <div class="main-footer">
          <form>
              <input type="text" placeholder="Add a comment">
              <button>Post</button>
          </form>
      </div>
  </div>
</template>

<script>
import Airplane from '../ICONS/airplane.vue'
import Comment from '../ICONS/comment.vue'
import Heart from '../ICONS/love.vue'
import Bookmark from '../ICONS/bookmark.vue'
export default {
    components:{
        Airplane,
        Heart,
        Comment,
        Bookmark
    },
    computed:{
        getPath(){
            console.log(this.id)
            return '/' + this.id + '/' + 'profile'
        }
    },
    props: ['authorURL', 'author', 'imageURL', 'likes', 'caption', 'numberOfComments', 'topCommentAuthor', 'topComment', 'time', 'id'],
}
</script>

<style lang="scss" scoped>
    .card{
        border: 1px solid #cfcfcf;
        max-width: 35rem;
        width: 100%;
        margin: 2rem 0;
        // min-height: 30rem;
        // height: 100%;
        
        header{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            background: white;
            padding: .5rem 1rem;
            // height: 7%;

            img{
                height: 30px;
                width: 30px;
                border-radius: 50%;
                object-fit: cover;
                margin-right: 1rem;
            }

            .author{
                span{
                    color: #262626;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-size: 14px;
                    font-weight: 600;
                    
                    a{
                        color: #262626;
                        text-decoration: none;
                    }
                }
            }
        }

        body{
            // height: 50%;
            width: 100%;
            max-height: 30rem;
            min-height: 30rem;
            height: 30rem;
            overflow: hidden;

            img{
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }

        footer{
            // height: 38%;
            padding: 1rem;

            .actions{
                display: flex;
                justify-content: space-between;
                margin-bottom: .5rem;


                .action1 > svg{
                    margin-right: .6rem;
                }
            }

            .likes{
                margin-bottom: .5rem;

                span{
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-weight: 600;
                    color: #262626;
                    font-size: 14px;
                }
            }

            .caption{
                margin-bottom: .5rem;

                span{
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-weight: 600;
                    color: #262626;
                    font-size: 14px;
                }

                p{
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-weight: 400;
                    color: #262626;
                    font-size: 14px;
                    display: inline;
                    margin-left: .3rem;
                }
            }

            .view-comments{
                margin-bottom: .5rem;

                p{
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-weight: 400;
                    color: #8e8e8e;
                    font-size: 14px;
                }
            }

            .top-comment{
                margin-bottom: .5rem;

                span{
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-weight: 600;
                    color: #262626;
                    font-size: 14px;
                }

                p{
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-weight: 400;
                    color: #262626;
                    font-size: 14px;
                    display: inline;
                    margin-left: .3rem;
                }
            }

            .time{
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-weight: 400;
                color: #8e8e8e;
                font-size: 10px;
            }
        }

        .main-footer{
            // height: 5%;
            background: red;

            form{
                height: 100%;
                position: relative;

                input{
                    width: 100%;
                    height: 3rem;
                    border: none;
                    outline: none;
                    border-top: 1px solid #8e8e8e;
                    padding: 0 1rem;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                button{
                    position: absolute;
                    right: 5%;
                    top: 50%;
                    transform: translate(0, -50%);
                    background: none;
                    border: none;
                    outline: none;
                    color: #0095f6;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-size: 1rem;
                    font-weight: 600;
                    z-index: 2;
                }
            }
        }
    }
</style>