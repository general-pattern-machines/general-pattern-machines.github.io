$(document).ready(function() {

        var current_cmd_idxs = {
            "sweeping": 1,
        }
    
        var vid_start_times = {
            "sweeping": {
                1: 0.1,
                2: 21.7 + 0.1,
                3: 21.7 + 12 + 0.1,
                4: 21.7 + 12 + 20.8 + 0.1,
            },
            "clicker": {
                1: 0.1,
                2: 7.9 + 0.1,
            },
            "drawing": {
                1: 0 + 0.1,
                2: 0 + 10.1 + 0.1,
                3: 0 + 10.1 + 5.0 + 0.1,
                4: 0 + 10.1 + 5.0 + 5.3 + 0.1,
                5: 0 + 10.1 + 5.0 + 5.3 + 4.6 + 0.1,
                6: 0 + 10.1 + 5.0 + 5.3 + 4.6 + 9.8 + 0.1,
                7: 0 + 10.1 + 5.0 + 5.3 + 4.6 + 9.8 + 4.2 + 0.1,
                8: 0 + 10.1 + 5.0 + 5.3 + 4.6 + 9.8 + 4.2 + 5.1 + 0.1,
                9: 0 + 10.1 + 5.0 + 5.3 + 4.6 + 9.8 + 4.2 + 5.1 + 4.7 + 0.1,
                10: 0 + 10.1 + 5.0 + 5.3 + 4.6 + 9.8 + 4.2 + 5.1 + 4.7 + 9.4 + 0.1,
                11: 0 + 10.1 + 5.0 + 5.3 + 4.6 + 9.8 + 4.2 + 5.1 + 4.7 + 9.4 + 5.3 + 0.1,
                12: 0 + 10.1 + 5.0 + 5.3 + 4.6 + 9.8 + 4.2 + 5.1 + 4.7 + 9.4 + 5.3 + 5.4 + 0.1,
            }
        }
    
        var vid_end_times = {
            "sweeping": {
                1: 21.7,
                2: 21.7 + 12,
                3: 21.7 + 12 + 20.8,
                4: 21.7 + 12 + 20.8 + 14,
            },
            "clicker": {
                1: 7.9,
                2: 7.9 + 6.5,
            },
            "drawing": {
                1: 0 + 10.1,
                2: 0 + 10.1 + 5.0,
                3: 0 + 10.1 + 5.0 + 5.3,
                4: 0 + 10.1 + 5.0 + 5.3 + 4.6,
                5: 0 + 10.1 + 5.0 + 5.3 + 4.6 + 9.8,
                6: 0 + 10.1 + 5.0 + 5.3 + 4.6 + 9.8 + 4.2,
                7: 0 + 10.1 + 5.0 + 5.3 + 4.6 + 9.8 + 4.2 + 5.1,
                8: 0 + 10.1 + 5.0 + 5.3 + 4.6 + 9.8 + 4.2 + 5.1 + 4.7,
                9: 0 + 10.1 + 5.0 + 5.3 + 4.6 + 9.8 + 4.2 + 5.1 + 4.7 + 9.4,
                10: 0 + 10.1 + 5.0 + 5.3 + 4.6 + 9.8 + 4.2 + 5.1 + 4.7 + 9.4 + 5.3,
                11: 0 + 10.1 + 5.0 + 5.3 + 4.6 + 9.8 + 4.2 + 5.1 + 4.7 + 9.4 + 5.3 + 5.4,
                12: 0 + 10.1 + 5.0 + 5.3 + 4.6 + 9.8 + 4.2 + 5.1 + 4.7 + 9.4 + 5.3 + 5.4 + 5.6,
            }
        }
    
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
    