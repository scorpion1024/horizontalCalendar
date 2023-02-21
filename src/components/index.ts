import horizontalCalendar from "./horizontalCalendar.vue";
const component = [horizontalCalendar];
const CcgUI = {
    install(App: { component: (arg0: any, arg1: any) => void; }) {
        component.forEach((item) => {
            App.component(item.name, horizontalCalendar);
        });
    },
};
export default CcgUI;// 按需引入