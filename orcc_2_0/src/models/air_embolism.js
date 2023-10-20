export let model = {};
model.page = {
  pageNumber: '01',
  title: 'Air Embolism - Venous',
  subTitle: 'Decreased end-tidal CO<sub>2</sub>, decreased oxygen saturation, hypotension'
};

model.stepSets = [
  [
    {
      id: '100',
      main: 'Call for help',
      editable: true,
      subContent: {
        contentType: 'action-list',
        items: [
          '<b>Ask</b>: <em>"Who will be the crisis manager?"</em>',
          'Crisis manager designates checklist reader',
        ]
      },
      info: 'Please add details about how to call for extra help at your facility, such as overhead page or call a specific phone number.',
    },
    {
      id: '101',
      main: 'Turn FiO<sub>2</sub> to 100%',
      subContent: {
        contentType: 'action-list',
        items: [
          'Turn off nitrous oxide',
        ]
      },
    },
    {
      id: '102',
      main: 'Stop source of gas entry',
      subContent: {
        contentType: 'action-list',
        items: [
          'Fill wound with irrigation and/or apply bone wax to bone edges',
          'Lower surgical site below level of heart if possible',
          'Search for entry point (including open venous lines)',
          'Desufflate if concern for CO<sub>2</sub> embolism',
        ]
      },
    },
    {
      id: '103',
      main: 'Support hemodynamics',
      subContent: {
        contentType: 'action-list',
        items: [
          'Escalate vasopressor support as needed',
          'Turn down anesthetic agents',
        ]
      }
    },
    {
      id: '104',
      main: 'Consider...',
      subContent: {
        contentType: 'action-list',
        items: [
          {
            text: 'Positioning patient with left side down',
            subList: [
              'Continue monitoring during positioning',
            ],
          },
          'Removing PEEP in patients with PFO at risk for paradoxical embolism',
          'Avoid spontaneous ventilation; paralyze as needed',
          'Using ETCO<sub>2</sub> to monitor progression and resolution of embolism or for assessment of cardiac output',
          {
            text: 'If diagnosis is unclear, call for TEE',
            editable: true,
            deletable: true,
            info: 'Please add details about how to obtain a TEE at your facility here, such as phone numbers or paging groups. If you do not have access to TEE, delete this bullet point.',
          },
          {
            text: 'If ongoing hemodynamic instability, call for ECMO or cardiopulmonary bypass',
            editable: true,
            deletable: true,
            info: 'Please add details about how to coordinate ECMO at your facility here, such as phone numbers or paging groups. If you do not have access to ECMO, delete this bullet point.',
          },
        ]
      }
    },
    {
      id: '105',
      main: 'Continuing care',
      deletable: true,
      subContent: {
        contentType: 'action-list',
        items: [
          {
            text: 'Consider hyperbaric oxygen treatment within 6 hours for evidence of paradoxical embolism',
            editable: true,
            info: 'If your facility has access to a hyperbaric oxygen chamber, you can add details here about how to contact them and coordinate this care. If your facility does not have access, you may delete all of step 6.',
          },
        ]
      },
    }
  ]
];

model.references = {
  'differential-diagnosis': {
    id: 'differential-diagnosis',
    header: 'DIFFERENTIAL diagnosis',
    layout: 'vertical-sections',
    sections: [
      {
        contentType: 'text',
        contentItems: [
          'Amniotic Fluid Embolism',
          'Cement Embolism',
          'Venous Thromboembolism/Pulmonary Embolism',
          'Non-embolic causes of hypotension (<span class="screen-click-only" onclick="navigateTo(\'hypotension\')">CHKLST 10</span>)',
          'Non-embolic causes of hypoxia (<span class="screen-click-only" onclick="navigateTo(\'hypoxia\')">CHKLST 11</span>)',
        ]
      }
    ]
  },
  'critical-changes': {
    id: 'critical-changes',
    header: 'Critical CHANGES',
    layout: 'vertical-sections',
    sections: [
      {
        contentType: 'text',
        contentItems: [
          'If <b>PEA</b> develops, <span class="screen-click-only" onclick="navigateTo(\'cardiac_arrest_pea_asystole\')"><em>go to</em> CHKLST 04</span>',
        ],
      },
    ]
  },
};