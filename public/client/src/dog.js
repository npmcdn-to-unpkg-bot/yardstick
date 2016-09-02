function dog(speak) {
  console.log(`%c ________________________________________
<` + speak + `>
 ----------------------------------------
                          
        \\   ^__^         \\ 
         \\  (oo)\\_______//
            (..)\\       )
                ||-----||
                ||     ||`, "font-family:monospace")
}



function takeOverConsole(){
    var console = window.console
    if (!console) return
    if(console.log) {
      return dog()
    }
}

export default takeOverConsole;