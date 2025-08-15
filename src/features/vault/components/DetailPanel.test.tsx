/** @jest-environment jsdom */
import { render, screen, fireEvent } from '@testing-library/react'
import DetailPanel from './DetailPanel'
import { useVaultStore } from '../../../app/store/vault'
import '@testing-library/jest-dom'

test('masks password and copies to clipboard', async () => {
  Object.assign(navigator, {
    clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
  })

  useVaultStore.setState({
    items: [
      {
        id: '1',
        name: 'Test',
        username: 'user',
        password: 'DEMO_ONLY',
        updatedAt: '2024-01-01T00:00:00Z',
      },
    ],
    filters: { text: '', folder: undefined },
    selectedId: '1',
  })

  render(<DetailPanel />)

  const pwdField = screen.getByLabelText('Heslo') as HTMLInputElement
  expect(pwdField.type).toBe('password')

  const copyBtn = screen.getByRole('button', { name: /kopírovat heslo/i })
  fireEvent.click(copyBtn)
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith('DEMO_ONLY')
})

