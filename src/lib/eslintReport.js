export class EslintReport {
    /**
     * @param {string} filePath
     * @param {Array<any>} messages
     * @param {Array<any>} suppressedMessages
     * @param {number} errorCount
     * @param {number} fatalErrorCount
     * @param {number} warningCount
     * @param {number} fixableErrorCount
     * @param {number} fixableWarningCount
     * @param {Array<any>} usedDeprecatedRules
     */
    constructor(
      filePath,
      messages,
      suppressedMessages,
      errorCount,
      fatalErrorCount,
      warningCount,
      fixableErrorCount,
      fixableWarningCount,
      usedDeprecatedRules
    ) {
      this.filePath = filePath;
      this.messages = messages;
      this.suppressedMessages = suppressedMessages;
      this.errorCount = errorCount;
      this.fatalErrorCount = fatalErrorCount;
      this.warningCount = warningCount;
      this.fixableErrorCount = fixableErrorCount;
      this.fixableWarningCount = fixableWarningCount;
      this.usedDeprecatedRules = usedDeprecatedRules;
    }
  }
