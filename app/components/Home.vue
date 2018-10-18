<template>
    <Page class="page">
        <ActionBar title="Home Page" class="action-bar"/>
        <!--<TabView height="100%" selectedTabColor="#53ba82" tabTextFontSize="15">-->
            <!--<TabViewItem title="Search Food" textTransform="uppercase">-->
        <ScrollView>
            <StackLayout>
                <SearchBar hint="red lentils" v-model="searchText" @submit="onSearchFoodTap"/>
                <ListView class="list-group" for="item in items">
                    <v-template>
                        <Label id="active task" :text="item.name" height="70"/>
                        <!--<Label id="active task" :text="item.serving" height="70"/>-->
                        <!--<Label id="active task" :text="item.photo" height="70"/>-->
                        <!--<Label id="active task" :text="item.tagID" height="70"/>-->
                    </v-template>
                </ListView>
            </StackLayout>
        </ScrollView>
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
            searchText: '',
            appID: "c32545ce",
            appKey: "d64606d7a3456c19baee2bd107dca747"
        };
    },
    methods: {

        onButtonTap() {
            const httpModule = require("http");
            console.log("fuck");
            let a = httpModule.getJSON("https://api.nal.usda.gov/ndb/V2/reports?ndbno=01009&ndbno=45202&ndbn" +
                "o=35193&type=b&format=json&api_key=eXK8zYpri0nY8GW5nRgIkAYtUsEIydgamzUyDOvf&location=Honolulu+HI").then((r) => {
                     //console.log(r);
                     console.log("I'm here");
                     this.extractJSON(r);
            }, (e) => {
                    console.log("Error?");
                }
            );
        },
        onSearchFoodTap() {
            const httpModule = require("http");
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
            // let request = httpModule.getJSON("https://trackapi.nutritionix.com/v2/search/instant?query="+
            //     this.searchText+"?x-app-id=" + this.appID + "&x-app-key="+ this.appKey).then((r) => {
            //         console.log("testing nutritionix api get request");
            //         console.log(r);
            // });
        },
        onSearchNutrientTap() {
            return null;
        },
        extractJSON(data) {
            if(data.hasOwnProperty('foods')) {
                console.log('hey hey seth here');
                for(const entry of data.foods) {
                    if(entry.hasOwnProperty('food')) {
                        console.log(entry.food.desc.name);
                        this.items.push(entry.food.desc.name);
                    }
                }
            }
        }
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
