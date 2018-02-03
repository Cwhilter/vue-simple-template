<template>
    <div class="dialog">
        <div class="body">{{message}}</div>
    </div>
</template>

<script>
    export default {
        components: {
            
        },
        props:['message']
    }
</script>
<style scoped>

.dialog{
    position: fixed;
    z-index: 10;
    top: 50%;
    left: 50%;
    margin-left: -100px;
    margin-top: -120px;
    min-width: 200px;
    height: 100px;
    border-radius: 5px;
    background-color: rgba(0,0,0,0.6);
    color: #eee;
    text-align: center;
    line-height: 100px;
    font-size: 16px;
}	

</style>
