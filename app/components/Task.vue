<template>
    <Page>
        <ActionBar title="My Tasks" class="action-bar"/>

        <TabView height="100%" selectedTabColor="#53ba82" tabTextFontSize="15">
            <TabViewItem title="To Do" textTransform="uppercase">
                <StackLayout orientation="vertical" width="100%" height="100%">

                    <GridLayout columns="2*,*" rows="*" width="100%" height="25%">
                        <TextField col="0" row="0" v-model="textFieldValue" hint="Type in a new task..." editable="true" @returnPress="onButtonTap"/>
                        <Button col="1" row="0" text="Add task" @tap="onButtonTap"/>

                        <!--<Label col="0" row="2" @tap="changeRoute"/>-->
                    </GridLayout>

                    <ListView class="list-group" for="todo in todos" @itemTap="onItemTap" style="height:75%" separatorColor="transparent">
                        <v-template>
                            <Label id="active-task" :text="todo.name" class="list-group-item-heading"/>
                        </v-template>
                    </ListView>

                </StackLayout>

            </TabViewItem>

            <TabViewItem title="Completed" textTransform="uppercase">
                <ListView  id="completed-list" class="list-group" for="done in dones" @itemTap="onDoneTap" style="height:75%" separatorColor="transparent">
                    <v-template>
                        <Label id="completed-task" :text="done.name" class="list-group-item-heading"/>
                    </v-template>
                </ListView>
            </TabViewItem>

        </TabView>

    </Page>
</template>

<script>
    import LoginComponent from '~/components/Login.vue';
    export default {

        data() {
            return {
                todos: [],
                dones: [],
                textFieldValue: "",
            };
        },
        methods: {
            changeRoute() {
                this.$navigateTo(LoginComponent);
            },
            onItemTap(args) {
                action('What do you want to do with this task?', 'Cancel', ['Mark completed', 'Delete forever'])
                    .then(result => {
                        console.log(result);
                        switch(result) {
                            case 'Mark completed':
                                this.dones.unshift(args.item);
                                this.todos.splice(args.index, 1);
                                break;
                            case 'Delete forever':
                                this.todos.splice(args.index, 1);
                                break;
                            case 'Cancel' || undefined:
                                break;

                        }
                    })
            },
            onDoneTap(args) {
                action('What do you want to with this task?', 'Cancel', ['Mark to do', 'Delete forever'])
                    .then(result => {
                        console.log(result);
                        switch(result) {
                            case 'Mark to do':
                                this.todos.unshift(args.item);
                                this.dones.splice(args.index, 1);
                                break;
                            case 'Delete forever':
                                this.dones.splice(args.index, 1);
                                break;
                            case 'Cancel || undefined':
                                break;
                        }
                    })
            },
            onButtonTap() {
                console.log("New Task is added" + this.textFieldValue + ".");
                this.todos.unshift({name: this.textFieldValue});
                this.textFieldValue = "";
            },
        }
    }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }
    TextField {
        font-size: 20;
        color: #53ba82;
        margin-top: 10;
        margin-bottom: 10;
        margin-right: 5;
        margin-left: 20;
    }
    Button {
        font-size: 20;
        font-weight: bold;
        color: white;
        background-color: #53ba82;
        height: 40;
        margin-top: 10;
        margin-bottom: 10;
        margin-right: 10;
        margin-left: 10;
        border-radius: 20px;
    }
    #active-task {
        font-size: 20;
        font-weight: bold;
        color: #53ba82;
        margin-left: 20;
        padding-top: 5;
        padding-bottom: 10;
    }
    #completed-task {
        font-size: 20;
        color: #d3d3d3;
        margin-left: 20;
        padding-top: 5;
        padding-bottom: 10;
        text-decoration: line-through;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
    .home-panel {
        vertical-align: center;
        font-size: 20;
        margin: 15;
    }
    .description-label {
        margin-bottom: 15;
    }
</style>
