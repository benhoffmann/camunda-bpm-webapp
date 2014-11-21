define(function() {
  'use strict';

  var dateExpLangHelp = 'E.g.: ${ now() }, ${ dateTime() } or ${ dateTime().plusWeeks(2) }';
  var userExpLangHelp = 'E.g.: ${ currentUser() }';
  var groupExpLangHelp = 'E.g.: ${ currentUserGroups() }';

  // yyyy-MM-dd'T'HH:mm:ss
  var dateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(|\.[0-9]{0,4})(|Z)$/;
  var expressionsRegex = /^[\s]*(\#|\$)\{/;
  var numberRegex = /^-?[\d]+$/;

  function isValid(regex, error, exprSupport) {

    return function (value) {

      if (exprSupport) {
        if (expressionsRegex.test(value)) {
          return { valid : true };
        }
      }

      if (regex.test(value)) {
        return { valid : true };

      }
      else {
        return {
          valid : false,
          error: error || 'format'
        };
      }
    };
  }

  var criteria = [
    {
      group: 'Process Instance',
      options: [
        {
          name: 'processInstanceId',
          label: 'Id'
        },
        {
          name: 'processInstanceBusinessKey',
          label: 'Business Key'
        },
        {
          name: 'processInstanceBusinessKeyLike',
          label: 'Business Key Like'
        }
      ]
    },
    {
      group: 'Process definition',
      options: [
        {
          name: 'processDefinitionId',
          label: 'Id'
        },
        {
          name: 'processDefinitionKey',
          label: 'Key'
        },
        {
          name: 'processDefinitionName',
          label: 'Name'
        },
        {
          name: 'processDefinitionNameLike',
          label: 'Name Like'
        }
      ]
    },
    {
      group: 'Case Instance',
      options: [
        {
          name: 'caseInstanceId',
          label: 'Id'
        },
        {
          name: 'caseInstanceBusinessKey',
          label: 'Business Key'
        },
        {
          name: 'caseInstanceBusinessKeyLike',
          label: 'Business Key Like'
        }
      ]
    },
    {
      group: 'Case definition',
      options: [
        {
          name: 'caseDefinitionId',
          label: 'Id'
        },
        {
          name: 'caseDefinitionKey',
          label: 'Key'
        },
        {
          name: 'caseDefinitionName',
          label: 'Name'
        },
        {
          name: 'caseDefinitionNameLike',
          label: 'Name Like'
        }
      ]
    },
    {
      group: 'Other',
      options: [
        {
          name: 'active',
          label: 'Active'
        },
        {
          name: 'activityInstanceIdIn',
          label: 'Activity Instance Id In'
        },
        {
          name: 'executionId',
          label: 'Execution Id'
        }
      ]
    },
    {
      group: 'User / Group',
      options: [
        {
          name: 'assignee',
          label: 'Assignee',
          expressionSupport: true,
          help: userExpLangHelp
        },
        {
          name: 'assigneeLike',
          label: 'Assignee Like',
          expressionSupport: true,
          help: userExpLangHelp
        },
        {
          name: 'owner',
          label: 'Owner',
          expressionSupport: true,
          help: userExpLangHelp
        },
        {
          name: 'candidateGroup',
          label: 'Candidate Group',
          expressionSupport: true
        },
        {
          name: 'candidateGroups',
          label: 'Candidate Groups',
          expressionSupport: true,
          help: groupExpLangHelp
        },
        {
          name: 'candidateUser',
          label: 'Candidate User',
          expressionSupport: true,
          help: userExpLangHelp
        },
        {
          name: 'involvedUser',
          label: 'Involved User',
          expressionSupport: true,
          help: userExpLangHelp
        },
        {
          name: 'unassigned',
          label: 'Unassigned'
        },
        {
          name: 'delegationState',
          label: 'Delegation State'
        }
      ]
    },
    {
      group: 'Task',
      options: [
        {
          name: 'taskDefinitionKey',
          label: 'Definition Key'
        },
        {
          name: 'taskDefinitionKeyLike',
          label: 'Definition Key Like'
        },
        {
          name: 'name',
          label: 'Name'
        },
        {
          name: 'nameLike',
          label: 'Name Like'
        },
        {
          name: 'description',
          label: 'Description'
        },
        {
          name: 'descriptionLike',
          label: 'Description Like'
        },
        {
          name: 'priority',
          label: 'Priority',
          validate: isValid(numberRegex, 'number')
        },
        {
          name: 'maxPriority',
          label: 'Priority Max',
          validate: isValid(numberRegex, 'number')
        },
        {
          name: 'minPriority',
          label: 'Priority Min',
          validate: isValid(numberRegex, 'number')
        }
      ]
    },
    {
      group: 'Dates',
      validate: isValid(dateRegex, 'date', true),
      options: [
        {
          name: 'createdBefore',
          label: 'Created Before',
          expressionSupport: true,
          help: dateExpLangHelp
        },
        {
          name: 'createdAfter',
          label: 'Created After',
          expressionSupport: true,
          help: dateExpLangHelp
        },
        {
          name: 'dueBefore',
          label: 'Due Before',
          expressionSupport: true,
          help: dateExpLangHelp
        },
        {
          name: 'dueAfter',
          label: 'Due After',
          expressionSupport: true,
          help: dateExpLangHelp
        },
        {
          name: 'followUpAfter',
          label: 'Follow Up After',
          expressionSupport: true,
          help: dateExpLangHelp
        },
        {
          name: 'followUpBefore',
          label: 'Follow Up Before',
          expressionSupport: true,
          help: dateExpLangHelp
        },
        {
          name: 'followUpBeforeOrNotExistent',
          label: 'Follow Up Before or Not Existent',
          expressionSupport: true,
          help: dateExpLangHelp
        }
      ]
    }
  ];
  return criteria;
});
