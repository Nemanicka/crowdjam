
      var audioContext = new AudioContext();
            var scheduler = new WebAudioScheduler({
            context: audioContext
          });

        function metronome(e) {
        scheduler.insert(e.playbackTime + 0.000, ticktack, { frequency: 880, duration: 1.00 });
        scheduler.insert(e.playbackTime + 0.500, ticktack, { frequency: 440, duration: 0.05 });
        scheduler.insert(e.playbackTime + 1.000, ticktack, { frequency: 440, duration: 0.05 });
        scheduler.insert(e.playbackTime + 1.500, ticktack, { frequency: 440, duration: 0.05 });
        scheduler.insert(e.playbackTime + 2.000, metronome);
      }

            function ticktack(e) {
            var t0 = e.playbackTime;
            var t1 = t0 + e.args.duration;
            var osc = audioContext.createOscillator();
            var amp = audioContext.createGain();

            osc.frequency.value = e.args.frequency;
            osc.start(t0);
            osc.stop(t1);
            osc.connect(amp);

            amp.gain.setValueAtTime(0.5, t0);
            amp.gain.exponentialRampToValueAtTime(1e-6, t1);
            amp.connect(audioContext.destination);

            scheduler.nextTick(t1, function() {
              osc.disconnect();
                amp.disconnect();
        });
      }

            function start() {
            scheduler.start(metronome);
          }

        function stop() {
        scheduler.stop(true);
      }
