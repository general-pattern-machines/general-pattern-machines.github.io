$(document).ready(function() {

        var current_cmd_idxs = {
            "sweeping": 1,
        }
    
        var vid_start_times = {
            "sweeping": {
                1: 0 * 60 + 0.1,
                2: 0 * 60 + 21.7 + 0.1,
                3: 0 * 60 + 21.7 + 12 + 0.1,
                4: 0 * 60 + 21.7 + 12 + 20.8 + 0.1,
            },
        }
    
        var vid_end_times = {
            "sweeping": {
                1: 0 * 60 + 21.7,
                2: 0 * 60 + 21.7 + 12,
                3: 0 * 60 + 21.7 + 12 + 20.8,
                4: 0 * 60 + 21.7 + 12 + 20.8 + 14,
            },
        }
    
        // var vid_start_times = {
        //     "sweeping": {
        //         1: 0,
        //         2: 21,
        //         3: 21 + 12,
        //         4: 21 + 12 + 21
        //     },
        // }
    
        // var vid_end_times = {
        //     "sweeping": {
        //         1: 21,
        //         2: 21 + 12,
        //         3: 21 + 12 + 21,
        //         4: 21 + 12 + 21 + 14
        //     },
        // }


        function playSeg(vid, start_time, end_time, domain_name, desired_cmd_idx) {
            vid.pause();
            // vid.play()
            vid.currentTime = start_time.toString();
            console.log(start_time.toString());
            vid.play()
    
            var pausing_function = function() {
                if (this.currentTime >= end_time) {
                    this.pause();
                    this.removeEventListener("timeupdate", pausing_function);
                }
            };
            vid.addEventListener("timeupdate", pausing_function);
        }
    
        // demos
        $('select').on('change', function() {
            var sep_idx = this.value.indexOf('_');
            var domain_name = this.value.substring(0, sep_idx);
            var desired_cmd_idx = parseInt(this.value.substring(sep_idx + 1));
            var current_cmd_idx = current_cmd_idxs[domain_name];
            
            // switch videos
            var vid = $("#vid_" + domain_name)[0];
            var start_time = vid_start_times[domain_name][desired_cmd_idx];
            var end_time = vid_end_times[domain_name][desired_cmd_idx];
            playSeg(vid, start_time, end_time, domain_name, desired_cmd_idx);
    
            // set current to desired
            current_cmd_idxs[domain_name] = desired_cmd_idx;
        });
    });
    