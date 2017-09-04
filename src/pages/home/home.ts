import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Authentication} from "../../services/authentication";
import {Uploader} from "../../services/uploader";
import {Hotspot, HotspotNetwork} from '@ionic-native/hotspot';
import {Platform} from 'ionic-angular';
import {EstimoteBeacons} from '@ionic-native/estimote-beacons';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  files: any;
  beacons: any = [];
  beaconList = {
    "CF:31:22:16:7A:D9": "ice",
    "F3:BC:CF:5E:A8:C9": "blueberry"
  };

  constructor(public navCtrl: NavController, private auth: Authentication, private uploader: Uploader,
              private hotspot: Hotspot, public platform: Platform, private eb: EstimoteBeacons) {

  }


  ionViewDidLoad() {
    let region = {};
    if (this.platform.is('cordova')) {
      this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
        console.log(networks);
      });
      this.eb.requestAlwaysAuthorization();
      this.eb.enableAnalytics(true);
      this.eb.startRangingBeaconsInRegion(region).subscribe(info => {
        for (let beacon of info.beacons) {
          console.log(beacon);
          this.beacons.push(beacon);
          /*if(this.beacons.findIndex(i => i.macAddress == beacon.macAddress) == -1){
            this.beacons.push(beacon);
          }*/
        }
      });
      this.hotspot.isWifiOn().then((b: boolean) => {
        if (b) {
          this.hotspot.toggleWifi();
        }
      })
    }
  }

  trackByFn(index, item) {
    return index;
  }

  getBeaconName(mac){
    return this.beaconList[mac];
  }

  fileChange(e) {
    this.files = e.target.files;
  }

  submit() {
    if (this.files.length <= 0) return;
    this.uploader.uploadMultiple(this.files);
  }

}
