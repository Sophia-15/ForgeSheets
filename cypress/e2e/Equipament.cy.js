describe('test suite Sheet', () => {
    it('adicionar equipamentos - completo', () => {
        cy.visit('/');
        cy.get('.registerAnchor').click()
        cy.get('#cadastrinho > form > #user').type('Demetrius')
        cy.get('#email').type('Demetrius@gmail.com')
        cy.get('#cadastrinho > form > #password').type('123')
        cy.get('#cadastrinho > form > button').click()
        cy.get('#loginzinho > form > #user').type('Demetrius')
        cy.get('#loginzinho > form > #password').type('123')
        cy.get('#loginzinho > form > button').click()
        cy.get('.createSheet').click()
        cy.get('.container > :nth-child(2) > a').click()
        cy.get('.openEquipmentBtn').click()
        cy.get('.equipmentModal > .modal > form > .equipmentName > input').type('Espada')
        cy.get('.equipmentModal > .modal > form > .equipmentName > input').type('1')
        cy.get('.equipmentModal > .modal > form > .sideBySide > .equipmentAttack > input').type('2')
        cy.get('.equipmentModal > .modal > form > .sideBySide > .equipmentDefense > input').type('1')
        cy.get('#addEquipmentBtn').click()
        cy.get('.equipmentList').invoke('text').should('have.string',"\n                            \n                        \n      \n        \n        \n        \n        \n      \n      1x Espada1\n      - Atk: 2\n      | Def: 1\n      \n          \n      \n      \n          \n      \n    ")
        // n sei pq o cypress so le assim
    })
    it('adicionar equipamentos - erros', () => {
        cy.visit('/');
        cy.get('#loginzinho > form > #user').type('Demetrius')
        cy.get('#loginzinho > form > #password').type('123')
        cy.get('#loginzinho > form > button').click()
        cy.get('.createSheet').click()
        cy.get('.container > :nth-child(2) > a').click()
        cy.get('.openEquipmentBtn').click()
        cy.get('#addEquipmentBtn').click()
        cy.get('span').invoke('text').should('have.string', "Esse campo não pode ser vazio")
    })
    it('adicionar equipamentos - sem ataque e defesa', () => {
        cy.visit('/');
        cy.get('#loginzinho > form > #user').type('Demetrius')
        cy.get('#loginzinho > form > #password').type('123')
        cy.get('#loginzinho > form > button').click()
        cy.get('.createSheet').click()
        cy.get('.container > :nth-child(2) > a').click()
        cy.get('.openEquipmentBtn').click()
        cy.get('.equipmentModal > .modal > form > .equipmentName > input').type('Tocha')
        cy.get('.equipmentModal > .modal > form > .equipmentName > input').type('1')
        cy.get('.equipmentModal > .modal > form > .sideBySide > .equipmentAttack > input').type('0')
        cy.get('.equipmentModal > .modal > form > .sideBySide > .equipmentDefense > input').type('0')
        cy.get('#addEquipmentBtn').click()
        cy.get('.equipmentList').invoke('text').should('have.string',"1x Tocha")
    })
})