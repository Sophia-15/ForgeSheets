describe('test suite Sheet', () => {
    it('criação de fichas - sem foto e sem descrição', () => {
        cy.visit('/');
        cy.get('.registerAnchor').click()
        cy.get('#cadastrinho > form > #user').type('Gabriel')
        cy.get('#email').type('gabriel@gmail.com')
        cy.get('#cadastrinho > form > #password').type('123')
        cy.get('#cadastrinho > form > button').click()
        cy.get('#loginzinho > form > #user').type('Gabriel')
        cy.get('#loginzinho > form > #password').type('123')
        cy.get('#loginzinho > form > button').click()
        cy.get('.createSheet').click()
        cy.get('.container > :nth-child(2) > a').click()
        cy.get('.sheetHeader > :nth-child(1) > input').type('Darius')
        cy.get('.sheetHeader > :nth-child(2) > input').type('Humano')
        cy.get('.sheetHeader > :nth-child(3) > input').type('Guerreiro')
        cy.get('#strength').type('20')
        cy.get('#intelligence').type('10')
        cy.get('#wisdom').type('18')
        cy.get('#charisma').type('7')
        cy.get('#constitution').type('20')
        cy.get('#speed').type('8')
        cy.get('#healthPointMax').type('100')
        cy.get('#manaMax').type('100')
        cy.get('#exp').type('4')
        cy.get('#submit_button').click()
        cy.get('#Card > .detailLink > h2').last().invoke('text').should('have.string',"Darius")
        cy.get('#Card > .detailLink > .sheet_info > :nth-child(1) > :nth-child(2)').last().invoke('text').should('have.string',"0 (4/100xp)")
        cy.get('#Card > .detailLink > .sheet_info > :nth-child(2) > :nth-child(2)').last().invoke('text').should('have.string',"Humano")
        cy.get('#Card > .detailLink > .sheet_info > :nth-child(3) > :nth-child(2)').last().invoke('text').should('have.string',"Guerreiro")
    })
    it('criação de fichas - com foto e descrição', () => {
        cy.visit('/');
        cy.get('#loginzinho > form > #user').type('Gabriel')
        cy.get('#loginzinho > form > #password').type('123')
        cy.get('#loginzinho > form > button').click()
        cy.get('.createSheet').click()
        cy.get('.container > :nth-child(2) > a').click()
        cy.get('.sheetHeader > :nth-child(1) > input').type('Ellie')
        cy.get('.sheetHeader > :nth-child(2) > input').type('Humano')
        cy.get('.sheetHeader > :nth-child(3) > input').type('Infiltradora')
        cy.get('#strength').type('19')
        cy.get('#intelligence').type('12')
        cy.get('#wisdom').type('15')
        cy.get('#charisma').type('3')
        cy.get('#constitution').type('10')
        cy.get('#speed').type('18')
        cy.get('#healthPointMax').type('1020')
        cy.get('#manaMax').type('1010')
        cy.get('#exp').type('1000') // testa o nivel
        cy.get('.openImageBtn').click()
        cy.get('.image').type("https://i.pinimg.com/564x/9f/76/15/9f76157b2d82cf03e490e0ea22a42511.jpg")
        cy.get('#addImageBtn').click()
        cy.get('#description').type('A ultima esperança da Humanidade')
        cy.get('#submit_button').click()
        cy.get('#Card > .detailLink > h2').last().invoke('text').should('have.string',"Ellie")
        cy.get('#Card > .detailLink > .sheet_info > :nth-child(1) > :nth-child(2)').last().invoke('text').should('have.string',"3 (300/800xp)")
        cy.get('#Card > .detailLink > .sheet_info > :nth-child(2) > :nth-child(2)').last().invoke('text').should('have.string',"Humano")
        cy.get('#Card > .detailLink > .sheet_info > :nth-child(3) > :nth-child(2)').last().invoke('text').should('have.string',"Infiltradora")
    })
    it('criação de fichas - mensagens de erro', () => {
        cy.visit('/');
        cy.get('#loginzinho > form > #user').type('Gabriel')
        cy.get('#loginzinho > form > #password').type('123')
        cy.get('#loginzinho > form > button').click()
        cy.get('.createSheet').click()
        cy.get('.container > :nth-child(2) > a').click()
        cy.get('.sheetHeader > :nth-child(1) > input').type('Gar rosh')
        cy.get('.sheetHeader > :nth-child(3) > input').type('o')
        cy.get('#intelligence').type('10')
        cy.get('#wisdom').type('18')
        cy.get('#constitution').type('20')
        cy.get('#speed').type('8')
        cy.get('#manaMax').type('100')
        cy.get('#submit_button').click()
        cy.get(':nth-child(2) > span').invoke('text').should('have.string',"Este campo não pode ser vazio!")
        cy.get('.atributosInputs > span').invoke('text').should('have.string',"Este(s) campo(s) não pode(m) ser vazio(s)!")
        cy.get(':nth-child(3) > span').invoke('text').should('have.string',"Insira de 2 a 22 caracteres!")
        cy.get('.statusInputs > span').invoke('text').should('have.string',"Estes campos não podem ser vazios")
    })
})