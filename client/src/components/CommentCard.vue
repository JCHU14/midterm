<template>
    <div>
        <div class="col-12 d-none d-md-block my-5 text-center">
            <div class="row">
                <div class="col-3">
                    <img class="rounded-circle" :src="commentProp.creator.picture" alt="">
                    <p class="fs-3 my-3">{{ commentProp.creator.name }}</p>
                    <p class="fs-3 my-3">{{ commentProp.createdAt.toLocaleDateString() }}</p>
                </div>
                <div class="col-8">
                    <p class=" box text-light fs-4 ">{{ commentProp.body }}</p>

                    <button v-if="account.id == commentProp.creator.id" @click="deleteComment()"
                        class=" mb-2 fs-4 btn btn-danger">Delete Comment</button>
                </div>
            </div>
        </div>
        <div class="col-12 d-block d-md-none my-5 text-center">
            <div class="row">
                <div class="col-12">
                    <div class="row pb-5">
                        <div class="col-4">
                            <img class="rounded-circle" :src="commentProp.creator.picture" alt="">
                        </div>
                        <div class="col-8">
                            <p class="fs-3 my-3">{{ commentProp.creator.name }}</p>
                            <p class="fs-3 my-3">{{ commentProp.createdAt.toLocaleDateString() }}</p>

                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <p class=" box text-light fs-4 ">{{ commentProp.body }}</p>

                    <button v-if="account.id == commentProp.creator.id" @click="deleteComment()"
                        class=" mb-2 fs-4 btn btn-danger">Delete Comment</button>
                </div>
            </div>
        </div>


        <!-- <div class="col-sm-12 my-5 text-center">

        </div> -->
    </div>
</template>
    
    
<script>
import { computed } from 'vue';
import { commentService } from '../services/CommentService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';

export default {
    props: { commentProp: { type: Comment, required: true } },


    setup(props) {

        return {
            account: computed(() => AppState.account),

            async deleteComment() {
                try {


                    const yes = await Pop.confirm('are you sure you want to delete?');

                    if (!yes) {
                        return;
                    }

                    const commentId = props.commentProp.id;
                    logger.log(commentId)
                    await commentService.deleteComment(commentId)


                } catch (error) {
                    Pop.error(error)
                }
            }
        };
    },
};
</script>
    
    
<style lang="scss" scoped>
.boxImg {
    height: 40vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
}





.box {
    border: 5px solid gray;
    background-color: black;
}
</style>