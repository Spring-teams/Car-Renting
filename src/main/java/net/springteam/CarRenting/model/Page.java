package net.springteam.CarRenting.model;

public class Page {
    String home;
    String history;
    String guide;
    String info;
    public Page(){
        home="hidden";
        history="hidden";
        guide="hidden";
        info="hidden";
    }

    public String getHome() {
        return home;
    }

    public void setHome(String home) {
        this.home = home;
    }

    public String getHistory() {
        return history;
    }

    public void setHistory(String history) {
        this.history = history;
    }

    public String getGuide() {
        return guide;
    }

    public void setGuide(String guide) {
        this.guide = guide;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }
}
