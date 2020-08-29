<template>
  <div id="introduction">
    <p>
      Hi there! Thank you for coming here! Good to have somebody using this web
      application!
    </p>
    <h4>Motivation</h4>
    <p>
      This application is aiming to provide the user with a faster way to create
      customised SID/STAR procedures for their PMDG aircrafts. I was inspired by
      one of my friends, who had spent some time on creating procedures in PMDG
      format for some airports/procedures that have not been published in the
      public version of AIP, and hence not been included in data provided by
      Navigraph. Manually writing them can sometimes end up spending too much
      time before an online pilot can start enjoying the flight. Also, any small
      typo in the file may ruin the mood, especially when spending more than
      half an hours of extra time to "debug" the code, then realized one single
      character is missing from the file! &#128553; The usage of automation can
      (hopefully!) potentially save an online pilot.
    </p>
    <p>
      As a result, I sat down in front of my computer and wrote this application
      as one of my personal projects. I only spent a few hours writing this
      mockup so I left many functionalities empty/not implemented. I may
      continue updating it in the next few months for more polishments,
      functionalities and UI improvements.
    </p>
    <h4>Limitations</h4>
    <p>
      Currently, NO user input will be validated in the current version. There
      may also be some logical bugs, as I have only vaguely tested it. Also, I
      did not spend very much time on this project, advanced features, like same
      procedure for multiple runways, are not supported. After all planned
      functionalities are completed, the source code will be published on
      GitHub. If you found any bug, let me know and see how we can fix it or
      improve it. &#128521;
    </p>
    <h4>How to Use?</h4>
    <p>
      The philosophy of using this application is simple! It should be designed
      to allow the user to finish creating a procedure only using a keyboard,
      with the help of <kbd>tab</kbd> and <kbd>space</kbd> key. Every line
      represents a waypoint in the procedure. Every time when a new line is
      added, the cursor will automatically be relocated to focus on the new
      line. So,
      <ul>
        <li>use <kbd>tab</kbd> to move the cursor to the next input box</li>
        <li>use <kbd>shift</kbd> + <kbd>tab</kbd> to move backward</li>
        <li>use <kbd>space</kbd> to press the buttons</li>
      </ul>
      In the future version, more keyboard shortcuts will be added to further
      simplify the usage.
    </p>

    <p>
      Enjoy using this tool! &#128540;
    </p>
  </div>
</template>

<script>
export default {
  name: "IntroModal",
};
</script>
