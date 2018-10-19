<template>
    <Page class="page">
        <ActionBar title="Home Page" class="action-bar"/>
        <!--<TabView height="100%" selectedTabColor="#53ba82" tabTextFontSize="15">-->
            <!--<TabViewItem title="Search Food" textTransform="uppercase">-->
        <!--<ScrollView>-->
        <!--<StackLayout>-->
            <!---->
        <!--</StackLayout>-->
            <StackLayout orientation="vertical" width="100%" height="100%">
                <SearchBar hint="red lentils" v-model="searchText" @submit="onSearchFoodTap"/>
                <RadListView ref="listView" for="item in items" @itemTap="onItemTap">
                    <v-template>
                        <StackLayout>
                        <Label :text="item.name"></Label>
                        <Label :text="item.serving"></Label>
                        </StackLayout>
                    </v-template>
                </RadListView>
            </StackLayout>
        <!--</ScrollView>-->
            <!--</TabViewItem>-->


        <!--</TabView>-->
    </Page>
</template>

<script>
    import axios from 'axios';

export default {
    data() {
        return {
            items: [],
            searchText: 'butter',
            appID: "c32545ce",
            appKey: "d64606d7a3456c19baee2bd107dca747"
        };
    },
    methods: {
        onItemTap( {item}) {
          console.log(`Tapped on ${item}`);
        },
        onSearchFoodTap() {
            axios.get("https://trackapi.nutritionix.com/v2/search/instant?query="+this.searchText, {
                headers: {
                    "x-app-id": this.appID,
                    "x-app-key": this.appKey
                }
            }).then((result) => {
                console.log("testing get request with axios");
                //console.log(result.data.common);
                for(const food of result.data.common) {
                    console.log("hey");
                    console.log(food);
                    console.log("yo");
                    console.log(food.food_name);
                    console.log(food.serving_qty);
                    console.log(food.serving_unit);
                    console.log(food.photo.thumb);
                    console.log(food.tag_id);
                    this.items.push({
                        name: food.food_name,
                        serving: food.serving_qty + food.serving_unit,
                        photo: food.photo.thumb,
                        tagID: food.tag_id,
                    });

                }
            }, error => {
                console.error(error);
            });
        },
    },
    created() {
        this.onSearchFoodTap();
        console.log(this.items);
    }
}
</script>

<style>
    #active-task {
        font-size: 20;
        font-weight: bold;
        color: #53ba82;
        margin-left: 20;
        padding-top: 10;
        padding-bottom: 15;
    }
    /*.list-group-item {*/
        /*margin-top: 30;*/
        /*margin-bottom: 30;*/
    /*}*/
</style>
