<template>
    <!--e-->
    <Page class="page">
        <ActionBar title="Home Page" class="action-bar"/>
        <TabView height="100%" selectedTabColor="#53ba82" tabTextFontSize="15">
            <TabViewItem title="Search Food" textTransform="uppercase">
        <ScrollView>
            <StackLayout>
                <SearchBar hint="Search hint" :text="searchPhrase" />
                <Button col="0" row="0" text="Find Info" @tap="onButtonTap"/>
                <CardView class="cardStyle" margin="10" elevation="40" radius="5">
                <!--<GridLayout columns="auto, auto, *" rows="200, auto, auto">-->
                <!--</GridLayout>-->
                    <ListView class="list-group" for="item in items">
                        <v-template>

                            <Label v-model="item" class="list-group-item-text"/>
                        </v-template>
                    </ListView>

                    <!--<Label col="0" row="2" @tap="changeRoute"/>-->

                </CardView>
            </StackLayout>

            <!--<ListView for="item in items" class="list-group" @itemTap="onItemTap">-->

                <!--<v-template>-->
                    <!--<GridLayout class="list-group-item" rows="90" columns="auto, *">-->
                        <!--<Image row="0" col="0" :src="item.src" class="thumb img-circle"/>-->
                        <!--<Label row="0" col="1" :text="item.text"/>-->
                    <!--</GridLayout>-->
                <!--</v-template>-->
            <!--</ListView>-->
        </ScrollView>
            </TabViewItem>
            <TabViewItem title="Search Nutrient" textTransform="uppercase">

            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
export default {
    data() {
        return {
            items: []
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
        extractJSON(data) {
            let foodName;
            let;
            if(data.hasOwnProperty('foods')) {
                console.log('hey hey seth here');
                for(const entry of data.foods) {
                    if(entry.hasOwnProperty('food')) {
                        console.log(entry.food.desc.name);
                        //console.log('1');
                        this.items.push(entry.food.desc.name);
                        // console.log(food.desc.name);
                    }
                    //console.log('2');
                    // console.log("Print statement of food: " + food);
                    // this.items.push(food);
                }
            }
           // console.log(this.items);
        }
    }
}
</script>

<style>
    /*.list-group-item {*/
        /*margin-top: 30;*/
        /*margin-bottom: 30;*/
    /*}*/
</style>
